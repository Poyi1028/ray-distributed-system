// Real API implementation — based on uber-api-v3.md
// Activated when REACT_APP_USE_MOCK_API=false
//先讀環境檔看有沒有預設後端網址，沒有就用我預設的8000 
const BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"
const WS   = process.env.REACT_APP_WS_URL       || "ws://localhost:8000/ws" //ws is for websocket

// GET /cluster/eta
export async function getEta() {
  const res  = await fetch(`${BASE}/cluster/eta`)
  const data = await res.json()
  return {
    waitMin: Math.ceil(data.estimated_wait_seconds / 60), // 時間表線上直接對齊單位：分鐘 整體回傳格式要跟mock格式一致
    surge:   data.surge,
  }
}

// POST /orders
export async function createRideOrder(payload) {
  const res = await fetch(`${BASE}/orders`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" }, //告知傳送的資料格式方便解析
    body: JSON.stringify({
      order_type: "ride",
      payload: {
        origin:      payload.origin,
        destination: payload.dest, //destination 是API文件（檔名：v3)訂的名稱
        ride_type:   payload.rideType,
      },
    }),
  })
  return res.json()  // { order_id, status: "pending", ... }
}

// WS /ws  →  order_updated events
// callback receives: { status, trip?, result? }
export function subscribeRideOrder(orderId, callback) {
  const ws = new WebSocket(WS) // 建websocket的長連線去接上後端的 /ws
  ws.onmessage = (e) => {
    const { event, data } = JSON.parse(e.data)
    if (event === "order_updated" && data.order_id === orderId) { // only process order updates also 連線is shared only process "this order"
      callback(data)
    }
  }
  return () => ws.close()
}

//admin page 一共有三隻api 彼此之間時間不需要等待是同時的
// GET /orders + GET /cluster/status + GET /cluster/scaling-history
export async function getAdminSnapshot() {
  const [ordersRes, statusRes, historyRes] = await Promise.all([ //Promise.all得用途是：把三個請求打包，同時發出，等三個都回來才繼續
    fetch(`${BASE}/cluster/status`),
    fetch(`${BASE}/orders`),
    fetch(`${BASE}/cluster/scaling-history`),
  ])
  const [orders, status, history] = await Promise.all([
    ordersRes.json(),
    statusRes.json(),
    historyRes.json(),
  ])
  return {
    orders:  orders,
    workers: status.workers,
    logs:    history,
    metrics: status.metrics,
  }
}

// WS /ws  →  監聽heartbeat + cluster_updated events
// callback receives: { orders?, metrics? }
export function subscribeAdminUpdates(callback) {
  const ws = new WebSocket(WS)
  ws.onmessage = (e) => {
    const { event, data } = JSON.parse(e.data)
    if (event === "heartbeat") {
      callback({
        metrics: {
          workers:    data.worker_count,
          pending:    data.pending_tasks,
          cpu:        Math.round(data.cpu_percent * 100),
          cooldown:   0,
          lastAction: "—",
        },
      })
    }
  }
  return () => ws.close()
}
