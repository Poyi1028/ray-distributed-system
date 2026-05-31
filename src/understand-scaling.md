# Allen-RAY-Infra-scale_policy.yaml

## 0. .yaml file

```yaml
name: threshold
min_workers: 0        # 最少可以有 0 個 worker（全部砍掉也沒關係）
max_workers: 5        # 最多只能有 5 個 worker
cooldown: 15          # 每次 scale 動作之後，強制等 15 秒才能再 scale
cpu_scale_down_threshold: 0.1   # CPU 低於 10% 才考慮 scale down
scale_up_threshold: 3           # 連續 3 次 poll 都有 pending 才 scale up
```

## 1. Scale Up 的判斷流程

1. Autoscaler 每 5 秒 poll 一次 Ray Head

    1.1 發現有 pending_resource_demands（有訂單在等待執行）

        1.1.1 counter += 1

    1.2 counter 達到 3（連續 3 次 poll，也就是至少 15 秒持續有 pending）
        1.2.1 確認目前 worker 數 < max_workers（5）

        1.2.2 確認 cooldown 已過（距離上次 scale 超過 15 秒）

        1.2.3 執行 scale up，用 Docker 啟動新的 worker container

        1.2.4 counter 歸零，cooldown 重新計時

## 2. Scale Down 的判斷流程

2. Autoscaler 每 5 秒 poll 一次
  
    2.1 取得所有 worker 的 CPU 使用率

    2.2 發現某個 worker CPU < 10%（幾乎閒置）

        2.2.1 確認沒有 pending tasks（不能在有工作的時候砍）
        2.2.2 確認 cooldown 已過
        2.2.3 執行 scale down，移除那個 worker container
        2.2.4 cooldown 重新計時