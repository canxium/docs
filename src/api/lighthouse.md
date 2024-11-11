# Lighthouse Non-Standard APIs

Lighthouse fully supports the standardization efforts at
[github.com/ethereum/beacon-APIs](https://github.com/ethereum/beacon-APIs).
However, sometimes development requires additional endpoints that shouldn't
necessarily be defined as a broad-reaching standard.  Such endpoints are placed
behind the `/lighthouse` path.

The endpoints behind the `/lighthouse` path are:

- Not intended to be stable.
- Not guaranteed to be safe.
- For testing and debugging purposes only.

Although we don't recommend that users rely on these endpoints, we
document them briefly so they can be utilized by developers and
researchers.

## `/lighthouse/health`

*Note: This endpoint is presently only available on Linux.*

Returns information regarding the health of the host machine.

```bash
curl -X GET "http://localhost:5052/lighthouse/health" -H  "accept: application/json" | jq
```

```json
{
  "data": {
    "sys_virt_mem_total": 16671133696,
    "sys_virt_mem_available": 8273715200,
    "sys_virt_mem_used": 7304818688,
    "sys_virt_mem_free": 2998190080,
    "sys_virt_mem_percent": 50.37101,
    "sys_virt_mem_cached": 5013975040,
    "sys_virt_mem_buffers": 1354149888,
    "sys_loadavg_1": 2.29,
    "sys_loadavg_5": 3.48,
    "sys_loadavg_15": 3.72,
    "cpu_cores": 4,
    "cpu_threads": 8,
    "system_seconds_total": 5728,
    "user_seconds_total": 33680,
    "iowait_seconds_total": 873,
    "idle_seconds_total": 177530,
    "cpu_time_total": 217447,
    "disk_node_bytes_total": 358443397120,
    "disk_node_bytes_free": 70025089024,
    "disk_node_reads_total": 1141863,
    "disk_node_writes_total": 1377993,
    "network_node_bytes_total_received": 2405639308,
    "network_node_bytes_total_transmit": 328304685,
    "misc_node_boot_ts_seconds": 1620629638,
    "misc_os": "linux",
    "pid": 4698,
    "pid_num_threads": 25,
    "pid_mem_resident_set_size": 783757312,
    "pid_mem_virtual_memory_size": 2564665344,
    "pid_process_seconds_total": 22
  }
}

```

## `/lighthouse/ui/health`

Returns information regarding the health of the host machine.

```bash
curl -X GET "http://localhost:5052/lighthouse/ui/health" -H  "accept: application/json" | jq
```

```json
{
  "data": {
    "total_memory": 16443219968,
    "free_memory": 1283739648,
    "used_memory": 5586264064,
    "sys_loadavg_1": 0.59,
    "sys_loadavg_5": 1.13,
    "sys_loadavg_15": 2.41,
    "cpu_cores": 4,
    "cpu_threads": 8,
    "global_cpu_frequency": 3.4,
    "disk_bytes_total": 502390845440,
    "disk_bytes_free": 9981386752,
    "system_uptime": 660706,
    "app_uptime": 105,
    "system_name": "Arch Linux",
    "kernel_version": "5.19.13-arch1-1",
    "os_version": "Linux rolling Arch Linux",
    "host_name": "Computer1"
    "network_name": "wlp0s20f3",
    "network_bytes_total_received": 14105556611,
    "network_bytes_total_transmit": 3649489389,
    "nat_open": true,
    "connected_peers": 80,
    "sync_state": "Synced",
  }
}
```

## `/lighthouse/ui/validator_count`

Returns an overview of validators.

```bash
curl -X GET "http://localhost:5052/lighthouse/ui/validator_count" -H "accept: application/json" | jq
```

```json
{
  "data": {
    "active_ongoing":479508,
    "active_exiting":0,
    "active_slashed":0,
    "pending_initialized":28,
    "pending_queued":0,
    "withdrawal_possible":933,
    "withdrawal_done":0,
    "exited_unslashed":0,
    "exited_slashed":3
  }
}
```

## `/lighthouse/ui/validator_metrics`

Re-exposes certain metrics from the validator monitor to the HTTP API. This API requires that the beacon node to have the flag `--validator-monitor-auto`. This API will only return metrics for the validators currently being monitored and present in the POST data, or the validators running in the validator client.

```bash
curl -X POST "http://localhost:5052/lighthouse/ui/validator_metrics" -d '{"indices": [12345]}' -H "Content-Type: application/json" | jq
```

```json
{
  "data": {
    "validators": {
      "12345": {
        "attestation_hits": 10,
        "attestation_misses": 0,
        "attestation_hit_percentage": 100,
        "attestation_head_hits": 10,
        "attestation_head_misses": 0,
        "attestation_head_hit_percentage": 100,
        "attestation_target_hits": 5,
        "attestation_target_misses": 5,
        "attestation_target_hit_percentage": 50,
        "latest_attestation_inclusion_distance": 1
      }
    }
  }
}
```

Running this API without the flag `--validator-monitor-auto` in the beacon node will return null:

```json
{
  "data": {
    "validators": {}
  }
}
```

## `/lighthouse/syncing`

Returns the sync status of the beacon node.

```bash
curl -X GET "http://localhost:5052/lighthouse/syncing" -H  "accept: application/json" | jq
```

There are two possible outcomes, depending on whether the beacon node is syncing or synced.

1. Syncing:

   ```json
    {
      "data": {
        "SyncingFinalized": {
          "start_slot": "5478848",
          "target_slot": "5478944"
        }
      }
    }
   ```

1. Synced:

   ```json
   {
     "data": "Synced"
   }
   ```

## `/lighthouse/peers`

```bash
curl -X GET "http://localhost:5052/lighthouse/peers" -H  "accept: application/json" | jq
```

```json
[
  {
    "peer_id": "16Uiu2HAm2ZoWQ2zkzsMFvf5o7nXa7R5F7H1WzZn2w7biU3afhgov",
    "peer_info": {
      "score": {
        "Real": {
          "lighthouse_score": 0,
          "gossipsub_score": -18371.409037358582,
          "ignore_negative_gossipsub_score": false,
          "score": -21.816048231863316
        }
      },
      "client": {
        "kind": "Lighthouse",
        "version": "v4.1.0-693886b",
        "os_version": "x86_64-linux",
        "protocol_version": "eth2/1.0.0",
        "agent_string": "Lighthouse/v4.1.0-693886b/x86_64-linux"
      },
      "connection_status": {
        "status": "disconnected",
        "connections_in": 0,
        "connections_out": 0,
        "last_seen": 9028,
        "banned_ips": []
      },
      "listening_addresses": [
        "/ip4/212.102.59.173/tcp/23452",
        "/ip4/23.124.84.197/tcp/23452",
        "/ip4/127.0.0.1/tcp/23452",
        "/ip4/192.168.0.2/tcp/23452",
        "/ip4/192.168.122.1/tcp/23452"
      ],
      "seen_addresses": [
        "23.124.84.197:23452"
      ],
      "sync_status": {
        "Synced": {
          "info": {
            "head_slot": "5468141",
            "head_root": "0x7acc017a199c0cf0693a19e0ed3a445a02165c03ea6f46cb5ffb8f60bf0ebf35",
            "finalized_epoch": "170877",
            "finalized_root": "0xbbc3541637976bd03b526de73e60a064e452a4b873b65f43fa91fefbba140410"
          }
        }
      },
      "meta_data": {
        "V2": {
          "seq_number": 501,
          "attnets": "0x0000020000000000",
          "syncnets": "0x00"
        }
      },
      "subnets": [],
      "is_trusted": false,
      "connection_direction": "Outgoing",
      "enr": "enr:-L64QI37ReMIki2Uqln3pcgQyAH8Y3ceSYrtJp1FlDEGSM37F7ngCpS9k-SKQ1bOHp0zFCkNxpvFlf_3o5OUkBRw0qyCAfqHYXR0bmV0c4gAAAIAAAAAAIRldGgykGKJQe8DABAg__________-CaWSCdjSCaXCEF3xUxYlzZWNwMjU2azGhAmoW921eIvf8pJhOvOwuxLSxKnpLY2inE_bUILdlZvhdiHN5bmNuZXRzAIN0Y3CCW5yDdWRwgluc"
    }
  }
]
```

## `/lighthouse/peers/connected`

Returns information about connected peers.

```bash
curl -X GET "http://localhost:5052/lighthouse/peers/connected" -H  "accept: application/json" | jq
```

```json
[
 {
    "peer_id": "16Uiu2HAmCAvpoYE6ABGdQJaW4iufVqNCTJU5AqzyZPB2D9qba7ZU",
    "peer_info": {
      "score": {
        "Real": {
          "lighthouse_score": 0,
          "gossipsub_score": 0,
          "ignore_negative_gossipsub_score": false,
          "score": 0
        }
      },
      "client": {
        "kind": "Lighthouse",
        "version": "v3.5.1-319cc61",
        "os_version": "x86_64-linux",
        "protocol_version": "eth2/1.0.0",
        "agent_string": "Lighthouse/v3.5.1-319cc61/x86_64-linux"
      },
      "connection_status": {
        "status": "connected",
        "connections_in": 0,
        "connections_out": 1,
        "last_seen": 0
      },
      "listening_addresses": [
        "/ip4/144.91.92.17/tcp/9000",
        "/ip4/127.0.0.1/tcp/9000",
        "/ip4/172.19.0.3/tcp/9000"
      ],
      "seen_addresses": [
        "144.91.92.17:9000"
      ],
      "sync_status": {
        "Synced": {
          "info": {
            "head_slot": "5468930",
            "head_root": "0x25409073c65d2f6f5cee20ac2eff5ab980b576ca7053111456063f8ff8f67474",
            "finalized_epoch": "170902",
            "finalized_root": "0xab59473289e2f708341d8e5aafd544dd88e09d56015c90550ea8d16c50b4436f"
          }
        }
      },
      "meta_data": {
        "V2": {
          "seq_number": 67,
          "attnets": "0x0000000080000000",
          "syncnets": "0x00"
        }
      },
      "subnets": [
        {
          "Attestation": "39"
        }
      ],
      "is_trusted": false,
      "connection_direction": "Outgoing",
      "enr": "enr:-Ly4QHd3RHJdkuR1iE6MtVtibC5S-aiWGPbwi4cG3wFGbqxRAkAgLDseTzPFQQIehQ7LmO7KIAZ5R1fotjMQ_LjA8n1Dh2F0dG5ldHOIAAAAAAAQAACEZXRoMpBiiUHvAwAQIP__________gmlkgnY0gmlwhJBbXBGJc2VjcDI1NmsxoQL4z8A7B-NS29zOgvkTX1YafKandwOtrqQ1XRnUJj3se4hzeW5jbmV0cwCDdGNwgiMog3VkcIIjKA"
    }
  }
]
```

## `/lighthouse/proto_array`

```bash
curl -X GET "http://localhost:5052/lighthouse/proto_array" -H  "accept: application/json" | jq
```

*Example omitted for brevity.*

## `/lighthouse/validator_inclusion/{epoch}/{validator_id}`

## `/lighthouse/validator_inclusion/{epoch}/global`

## `/lighthouse/eth1/syncing`

Returns information regarding execution layer, as it is required for use in
consensus layer

### Fields

- `head_block_number`, `head_block_timestamp`: the block number and timestamp
from the very head of the execution chain. Useful for understanding the immediate
health of the execution node that the beacon node is connected to.
- `latest_cached_block_number` & `latest_cached_block_timestamp`: the block
number and timestamp of the latest block we have in our block cache.
  - For correct execution client voting this timestamp should be later than the
`voting_target_timestamp`.

- `voting_target_timestamp`: The latest timestamp allowed for an execution layer block in this voting period.
- `eth1_node_sync_status_percentage` (float): An estimate of how far the head of the
  execution node is from the head of the execution chain.
  - `100.0` indicates a fully synced execution node.
  - `0.0` indicates an execution node that has not verified any blocks past the
  genesis block.
- `lighthouse_is_cached_and_ready`: Is set to `true` if the caches in the
 beacon node are ready for block production.
  - This value might be set to
 `false` whilst `eth1_node_sync_status_percentage == 100.0` if the beacon
 node is still building its internal cache.
  - This value might be set to `true` whilst
 `eth1_node_sync_status_percentage < 100.0` since the cache only cares
 about blocks a certain distance behind the head.

### Example

```bash
curl -X GET "http://localhost:5052/lighthouse/eth1/syncing" -H  "accept: application/json" | jq
```

```json
{
  "data": {
    "head_block_number": 3611806,
    "head_block_timestamp": 1603249317,
    "latest_cached_block_number": 3610758,
    "latest_cached_block_timestamp": 1603233597,
    "voting_target_timestamp": 1603228632,
    "eth1_node_sync_status_percentage": 100,
    "lighthouse_is_cached_and_ready": true
  }
}
```

## `/lighthouse/eth1/block_cache`

Returns a list of all the execution layer blocks in the execution client voting cache.

### Example

```bash
curl -X GET "http://localhost:5052/lighthouse/eth1/block_cache" -H  "accept: application/json" | jq
```

```json
{
  "data": [
    {
      "hash": "0x3a17f4b7ae4ee57ef793c49ebc9c06ff85207a5e15a1d0bd37b68c5ef5710d7f",
      "timestamp": 1603173338,
      "number": 3606741,
      "deposit_root": "0xd24920d936e8fb9b67e93fd126ce1d9e14058b6d82dcf7d35aea46879fae6dee",
      "deposit_count": 88911
    },
    {
      "hash": "0x78852954ea4904e5f81038f175b2adefbede74fbb2338212964405443431c1e7",
      "timestamp": 1603173353,
      "number": 3606742,
      "deposit_root": "0xd24920d936e8fb9b67e93fd126ce1d9e14058b6d82dcf7d35aea46879fae6dee",
      "deposit_count": 88911
    }
  ]
}
```

## `/lighthouse/eth1/deposit_cache`

Returns a list of all cached logs from the deposit contract.

### Example

```bash
curl -X GET "http://localhost:5052/lighthouse/eth1/deposit_cache" -H  "accept: application/json" | jq
```

```json
{
  "data": [
    {
      "deposit_data": {
        "pubkey": "0xae9e6a550ac71490cdf134533b1688fcbdb16f113d7190eacf4f2e9ca6e013d5bd08c37cb2bde9bbdec8ffb8edbd495b",
        "withdrawal_credentials": "0x0062a90ebe71c4c01c4e057d7d13b944d9705f524ebfa24290c22477ab0517e4",
        "amount": "32000000000",
        "signature": "0xa87a4874d276982c471e981a113f8af74a31ffa7d18898a02df2419de2a7f02084065784aa2f743d9ddf80952986ea0b012190cd866f1f2d9c633a7a33c2725d0b181906d413c82e2c18323154a2f7c7ae6f72686782ed9e423070daa00db05b"
      },
      "block_number": 3086571,
      "index": 0,
      "signature_is_valid": false
    },
    {
      "deposit_data": {
        "pubkey": "0xb1d0ec8f907e023ea7b8cb1236be8a74d02ba3f13aba162da4a68e9ffa2e395134658d150ef884bcfaeecdf35c286496",
        "withdrawal_credentials": "0x00a6aa2a632a6c4847cf87ef96d789058eb65bfaa4cc4e0ebc39237421c22e54",
        "amount": "32000000000",
        "signature": "0x8d0f8ec11935010202d6dde9ab437f8d835b9cfd5052c001be5af9304f650ada90c5363022e1f9ef2392dd222cfe55b40dfd52578468d2b2092588d4ad3745775ea4d8199216f3f90e57c9435c501946c030f7bfc8dbd715a55effa6674fd5a4"
      },
      "block_number": 3086579,
      "index": 1,
      "signature_is_valid": false
    }
  ]
}
```

## `/lighthouse/liveness`

POST request that checks if any of the given validators have attested in the given epoch. Returns a list
of objects, each including the validator index, epoch, and `is_live` status of a requested validator.

This endpoint is used in doppelganger detection, and can only provide accurate information for the current, previous, or next epoch.

> Note that for this API, if you insert an arbitrary epoch other than the previous, current or next epoch of the network, it will return `"code:400"` and `BAD_REQUEST`.

```bash
curl -X POST "http://localhost:5052/lighthouse/liveness" -d '{"indices":["0","1"],"epoch":"1"}' -H  "content-type: application/json" | jq
```

```json
{
    "data": [
        {
            "index": "0",
            "epoch": "1",
            "is_live": true
        }
    ]
}
```

## `/lighthouse/database/info`

Information about the database's split point and anchor info.

```bash
curl "http://localhost:5052/lighthouse/database/info" | jq
```

```json
{
  "schema_version": 18,
  "config": {
    "slots_per_restore_point": 8192,
    "slots_per_restore_point_set_explicitly": false,
    "block_cache_size": 5,
    "historic_state_cache_size": 1,
    "compact_on_init": false,
    "compact_on_prune": true,
    "prune_payloads": true,
    "prune_blobs": true,
    "epochs_per_blob_prune": 1,
    "blob_prune_margin_epochs": 0
  },
  "split": {
    "slot": "7454656",
    "state_root": "0xbecfb1c8ee209854c611ebc967daa77da25b27f1a8ef51402fdbe060587d7653",
    "block_root": "0x8730e946901b0a406313d36b3363a1b7091604e1346a3410c1a7edce93239a68"
  },
  "anchor": {
    "anchor_slot": "7451168",
    "oldest_block_slot": "3962593",
    "oldest_block_parent": "0x4a39f21367b3b9cc272744d1e38817bda5daf38d190dc23dc091f09fb54acd97",
    "state_upper_limit": "7454720",
    "state_lower_limit": "0"
  },
  "blob_info": {
    "oldest_blob_slot": "7413769",
    "blobs_db": true
  }
}
```

The `anchor` will be `null` unless the node has been synced with checkpoint sync and state
reconstruction has yet to be completed.

## `/lighthouse/merge_readiness`

Returns the current difficulty and terminal total difficulty of the network. Before [The Merge](https://ethereum.org/en/roadmap/merge/) on 15<sup>th</sup> September 2022, you will see that the current difficulty is less than the terminal total difficulty, An example is shown below:

```bash
curl -X GET "http://localhost:5052/lighthouse/merge_readiness" | jq
```

```json
{
    "data":{
       "type":"ready",
       "config":{
          "terminal_total_difficulty":"6400"
       },
       "current_difficulty":"4800"
    }
 }
```

As all testnets and Mainnet have been merged, both values will be the same after The Merge. An example of response on the Goerli testnet:

```json
{
  "data": {
    "type": "ready",
    "config": {
      "terminal_total_difficulty": "10790000"
    },
    "current_difficulty": "10790000"
  }
}
```

## `/lighthouse/analysis/attestation_performance/{index}`

Fetch information about the attestation performance of a validator index or all validators for a
range of consecutive epochs.

Two query parameters are required:

- `start_epoch` (inclusive): the first epoch to compute attestation performance for.
- `end_epoch` (inclusive): the final epoch to compute attestation performance for.

Example:

```bash
curl -X GET "http://localhost:5052/lighthouse/analysis/attestation_performance/1?start_epoch=1&end_epoch=1" | jq
```

```json
[
  {
    "index": 1,
    "epochs": {
      "1": {
        "active": true,
        "head": true,
        "target": true,
        "source": true,
        "delay": 1
      }
    }
  }
]
```

Instead of specifying a validator index, you can specify the entire validator set by using `global`:

```bash
curl -X GET "http://localhost:5052/lighthouse/analysis/attestation_performance/global?start_epoch=1&end_epoch=1" | jq
```

```json
[
  {
    "index": 0,
    "epochs": {
      "1": {
        "active": true,
        "head": true,
        "target": true,
        "source": true,
        "delay": 1
      }
    }
  },
  {
    "index": 1,
    "epochs": {
      "1": {
        "active": true,
        "head": true,
        "target": true,
        "source": true,
        "delay": 1
      }
    }
  },
  {
    ..
  }
]

```

Caveats:

- For maximum efficiency the start_epoch should satisfy `(start_epoch * slots_per_epoch) % slots_per_restore_point == 1`.
  This is because the state *prior* to the `start_epoch` needs to be loaded from the database,
  and loading a state on a boundary is most efficient.

## `/lighthouse/analysis/block_rewards`

Fetch information about the block rewards paid to proposers for a range of consecutive blocks.

Two query parameters are required:

- `start_slot` (inclusive): the slot of the first block to compute rewards for.
- `end_slot` (inclusive): the slot of the last block to compute rewards for.

Example:

```bash
curl -X GET "http://localhost:5052/lighthouse/analysis/block_rewards?start_slot=1&end_slot=1" | jq
```

The first few lines of the response would look like:

```json
[
  {
    "total": 637260,
    "block_root": "0x4a089c5e390bb98e66b27358f157df825128ea953cee9d191229c0bcf423a4f6",
    "meta": {
      "slot": "1",
      "parent_slot": "0",
      "proposer_index": 93,
      "graffiti": "EF #vm-eth2-raw-iron-101"
    },
    "attestation_rewards": {
      "total": 637260,
      "prev_epoch_total": 0,
      "curr_epoch_total": 637260,
      "per_attestation_rewards": [
        {
          "50102": 780,
        }
      ]
    }
  }
]
```

Caveats:

- Presently only attestation and sync committee rewards are computed.
- The output format is verbose and subject to change. Please see [`BlockReward`][block_reward_src]
  in the source.
- For maximum efficiency the `start_slot` should satisfy `start_slot % slots_per_restore_point == 1`.
  This is because the state *prior* to the `start_slot` needs to be loaded from the database, and
  loading a state on a boundary is most efficient.

[block_reward_src]:
https://github.com/sigp/lighthouse/tree/unstable/common/eth2/src/lighthouse/block_rewards.rs

## `/lighthouse/analysis/block_packing`

Fetch information about the block packing efficiency of blocks for a range of consecutive
epochs.

Two query parameters are required:

- `start_epoch` (inclusive): the epoch of the first block to compute packing efficiency for.
- `end_epoch` (inclusive): the epoch of the last block to compute packing efficiency for.

```bash
curl -X GET "http://localhost:5052/lighthouse/analysis/block_packing_efficiency?start_epoch=1&end_epoch=1" | jq
```

An excerpt of the response looks like:

```json
[
  {
    "slot": "33",
    "block_hash": "0xb20970bb97c6c6de6b1e2b689d6381dd15b3d3518fbaee032229495f963bd5da",
    "proposer_info": {
      "validator_index": 855,
      "graffiti": "poapZoJ7zWNfK7F3nWjEausWVBvKa6gA"
    },
    "available_attestations": 3805,
    "included_attestations": 1143,
    "prior_skip_slots": 1
  },
  {
    ..
  }
]
```

Caveats:

- `start_epoch` must not be `0`.
- For maximum efficiency the `start_epoch` should satisfy `(start_epoch * slots_per_epoch) % slots_per_restore_point == 1`.
  This is because the state *prior* to the `start_epoch` needs to be loaded from the database, and
  loading a state on a boundary is most efficient.

## `/lighthouse/logs`

This is a Server Side Event subscription endpoint. This allows a user to read
the Lighthouse logs directly from the HTTP API endpoint. This currently
exposes INFO and higher level logs. It is only enabled when the `--gui` flag is set in the CLI.

Example:

```bash
curl -N "http://localhost:5052/lighthouse/logs"
```

Should provide an output that emits log events as they occur:

```json
{
"data": {
	  "time": "Mar 13 15:28:41",
	  "level": "INFO",
	  "msg": "Syncing",
	  "service": "slot_notifier",
	  "est_time": "1 hr 27 mins",
	  "speed": "5.33 slots/sec",
	  "distance": "28141 slots (3 days 21 hrs)",
	  "peers": "8"
	}
}
```

## `/lighthouse/nat`

Checks if the ports are open.

```bash
curl -X GET "http://localhost:5052/lighthouse/nat" | jq
```

An open port will return:

```json
{
  "data": true
}

# Beacon Node API

Lighthouse implements the standard [Beacon Node API
specification][OpenAPI]. Please follow that link for a full description of each API endpoint.

## Starting the server

A Lighthouse beacon node can be configured to expose an HTTP server by supplying the `--http` flag. The default listen address is `http://127.0.0.1:5052`.

The following CLI flags control the HTTP server:

- `--http`: enable the HTTP server (required even if the following flags are
 provided).
- `--http-port`: specify the listen port of the server.
- `--http-address`: specify the listen address of the server. It is _not_ recommended to listen
  on `0.0.0.0`, please see [Security](#security) below.
- `--http-allow-origin`: specify the value of the `Access-Control-Allow-Origin`
 header. The default is to not supply a header.
- `--http-enable-tls`: serve the HTTP server over TLS. Must be used with `--http-tls-cert`
 and `http-tls-key`. This feature is currently experimental, please see
 [Serving the HTTP API over TLS](#serving-the-http-api-over-tls) below.
- `--http-tls-cert`: specify the path to the certificate file for Lighthouse to use.
- `--http-tls-key`: specify the path to the private key file for Lighthouse to use.

The schema of the API aligns with the standard Beacon Node API as defined
at [github.com/ethereum/beacon-APIs](https://github.com/ethereum/beacon-APIs).
An interactive specification is available [here][OpenAPI].

## Security

**Do not** expose the beacon node API to the public internet or you will open your node to
denial-of-service (DoS) attacks.

The API includes several endpoints which can be used to trigger heavy processing, and as
such it is strongly recommended to restrict how it is accessed. Using `--http-address` to change
the listening address from `localhost` should only be done with extreme care.

To safely provide access to the API from a different machine you should use one of the following
standard techniques:

- Use an [SSH tunnel][ssh_tunnel], i.e. access `localhost` remotely. This is recommended, and
  doesn't require setting `--http-address`.
- Use a firewall to limit access to certain remote IPs, e.g. allow access only from one other
  machine on the local network.
- Shield Lighthouse behind an HTTP server with rate-limiting such as NGINX. This is only
  recommended for advanced users, e.g. beacon node hosting providers.

Additional risks to be aware of include:

- The `node/identity` and `node/peers` endpoints expose information about your node's peer-to-peer
  identity.
- The `--http-allow-origin` flag changes the server's CORS policy, allowing cross-site requests
  from browsers. You should only supply it if you understand the risks, e.g. malicious websites
  accessing your beacon node if you use the same machine for staking and web browsing.

## CLI Example

Start a beacon node and an execution node. Note that since [The Merge](https://ethereum.org/en/roadmap/merge/), an execution client is required to be running along with a beacon node. Hence, the query on Beacon Node APIs requires users to run both. While there are some Beacon Node APIs that you can query with only the beacon node, such as the [node version](https://ethereum.github.io/beacon-APIs/#/Node/getNodeVersion), in general an execution client is required to get the updated information about the beacon chain, such as [state root](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot), [headers](https://ethereum.github.io/beacon-APIs/#/Beacon/getBlockHeaders) and many others, which are dynamically progressing with time.

## HTTP Request/Response Examples

This section contains some simple examples of using the HTTP API via `curl`.
All endpoints are documented in the [Beacon Node API
specification][OpenAPI].

### View the head of the beacon chain

Returns the block header at the head of the canonical chain.

```bash
curl -X GET "http://localhost:5052/eth/v1/beacon/headers/head" -H  "accept: application/json" | jq
```

```json
{
  "execution_optimistic": false,
  "finalized": false,
  "data": {
    "root": "0x9059bbed6b8891e0ba2f656dbff93fc40f8c7b2b7af8fea9df83cfce5ee5e3d8",
    "canonical": true,
    "header": {
      "message": {
        "slot": "6271829",
        "proposer_index": "114398",
        "parent_root": "0x1d2b4fa8247f754a7a86d36e1d0283a5e425491c431533716764880a7611d225",
        "state_root": "0x2b48adea290712f56b517658dde2da5d36ee01c41aebe7af62b7873b366de245",
        "body_root": "0x6fa74c995ce6f397fa293666cde054d6a9741f7ec280c640bee51220b4641e2d"
      },
      "signature": "0x8258e64fea426033676a0045c50543978bf173114ba94822b12188e23cbc8d8e89e0b5c628a881bf3075d325bc11341105a4e3f9332ac031d89a93b422525b79e99325928a5262f17dfa6cc3ddf84ca2466fcad86a3c168af0d045f79ef52036"
    }
  }
}
```

The `jq` tool is used to format the JSON data properly. If it returns `jq: command not found`, then you can install `jq` with `sudo apt install -y jq`. After that, run the command again, and it should return the head state of the beacon chain.

### View the status of a validator

Shows the status of validator at index `1` at the `head` state.

```bash
curl -X GET "http://localhost:5052/eth/v1/beacon/states/head/validators/1" -H  "accept: application/json" | jq
```

```json
{
  "execution_optimistic": false,
  "finalized": false,
  "data": {
    "index": "1",
    "balance": "32004587169",
    "status": "active_ongoing",
    "validator": {
      "pubkey": "0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c",
      "withdrawal_credentials": "0x01000000000000000000000015f4b914a0ccd14333d850ff311d6dafbfbaa32b",
      "effective_balance": "32000000000",
      "slashed": false,
      "activation_eligibility_epoch": "0",
      "activation_epoch": "0",
      "exit_epoch": "18446744073709551615",
      "withdrawable_epoch": "18446744073709551615"
    }
  }
}
```

You can replace `1` in the above command with the validator index that you would like to query. Other API query can be done similarly by changing the link according to the Beacon API.

### Events API

The [events API](https://ethereum.github.io/beacon-APIs/#/Events/eventstream) provides information such as the payload attributes that are of interest to block builders and relays. To query the payload attributes, it is necessary to run Lighthouse beacon node with the flag `--always-prepare-payload`. With the flag `--always-prepare-payload`, it is mandatory to also have the flag `--suggested-fee-recipient` set on the beacon node. You could pass a dummy fee recipient and have it override with the intended fee recipient of the proposer during the actual block proposal. It is also recommended to add the flag `--prepare-payload-lookahead 8000` which configures the payload attributes to be sent at 4s into each slot (or 8s from the start of the next slot). An example of the command is:

```bash
curl -X 'GET' \
'http://localhost:5052/eth/v1/events?topics=payload_attributes' \
-H 'accept: text/event-stream' 
```

An example of response is:

```json
data:{"version":"capella","data":{"proposal_slot":"11047","proposer_index":"336057","parent_block_root":"0x26f8999d270dd4677c2a1c815361707157a531f6c599f78fa942c98b545e1799","parent_block_number":"9259","parent_block_hash":"0x7fb788cd7afa814e578afa00a3edd250cdd4c8e35c22badd327d981b5bda33d2","payload_attributes":{"timestamp":"1696034964","prev_randao":"0xeee34d7a3f6b99ade6c6a881046c9c0e96baab2ed9469102d46eb8d6e4fde14c","suggested_fee_recipient":"0x0000000000000000000000000000000000000001","withdrawals":[{"index":"40705","validator_index":"360712","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1202941"},{"index":"40706","validator_index":"360713","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1201138"},{"index":"40707","validator_index":"360714","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1215255"},{"index":"40708","validator_index":"360715","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1161977"},{"index":"40709","validator_index":"360716","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1257278"},{"index":"40710","validator_index":"360717","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1247740"},{"index":"40711","validator_index":"360718","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1204337"},{"index":"40712","validator_index":"360719","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1183575"},{"index":"40713","validator_index":"360720","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1157785"},{"index":"40714","validator_index":"360721","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1143371"},{"index":"40715","validator_index":"360722","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1234787"},{"index":"40716","validator_index":"360723","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1286673"},{"index":"40717","validator_index":"360724","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1419241"},{"index":"40718","validator_index":"360725","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1231015"},{"index":"40719","validator_index":"360726","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1304321"},{"index":"40720","validator_index":"360727","address":"0x73b2e0e54510239e22cc936f0b4a6de1acf0abde","amount":"1236543"}]}}}
```

## Serving the HTTP API over TLS
>
> **Warning**: This feature is currently experimental.

The HTTP server can be served over TLS by using the `--http-enable-tls`,
`http-tls-cert` and `http-tls-key` flags.
This allows the API to be accessed via HTTPS, encrypting traffic to
and from the server.

This is particularly useful when connecting validator clients to
beacon nodes on different machines or remote servers.
However, even when serving the HTTP API server over TLS, it should
not be exposed publicly without one of the security measures suggested
in the [Security](#security) section.

Below is a simple example serving the HTTP API over TLS using a
self-signed certificate on Linux:

### Enabling TLS on a beacon node

Generate a self-signed certificate using `openssl`:

```bash
openssl req -x509 -nodes -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
```

Note that currently Lighthouse only accepts keys that are not password protected.
This means we need to run with the `-nodes` flag (short for 'no DES').

Once generated, we can run Lighthouse and an execution node. In addition, add the flags `--http-enable-tls --http-tls-cert cert.pem --http-tls-key key.pem` to Lighthouse, the command should look like:

```bash
lighthouse bn \
  --network mainnet \
  --execution-endpoint http://localhost:8551 \
  --execution-jwt /secrets/jwt.hex \
  --checkpoint-sync-url https://mainnet.checkpoint.sigp.io \
  --http \
  --http-enable-tls \
  --http-tls-cert cert.pem \
  --http-tls-key key.pem
```

Note that the user running Lighthouse must have permission to read the
certificate and key.

The API is now being served at `https://localhost:5052`.

To test connectivity, you can run the following:

```bash
curl -X GET "https://localhost:5052/eth/v1/node/version" -H  "accept: application/json" --cacert cert.pem | jq

```

### Connecting a validator client

In order to connect a validator client to a beacon node over TLS, the validator
client needs to be aware of the certificate.
There are two ways to do this:

#### Option 1: Add the certificate to the operating system trust store

The process for this will vary depending on your operating system.
Below are the instructions for Ubuntu and Arch Linux:

```bash
# Ubuntu
sudo cp cert.pem /usr/local/share/ca-certificates/beacon.crt
sudo update-ca-certificates
```

```bash
# Arch
sudo cp cert.pem /etc/ca-certificates/trust-source/anchors/beacon.crt
sudo trust extract-compat
```

Now the validator client can be connected to the beacon node by running:

```bash
lighthouse vc --beacon-nodes https://localhost:5052
```

#### Option 2: Specify the certificate via CLI

You can also specify any custom certificates via the validator client CLI like
so:

```bash
lighthouse vc --beacon-nodes https://localhost:5052 --beacon-nodes-tls-certs cert.pem
```

## Troubleshooting

### HTTP API is unavailable or refusing connections

Ensure the `--http` flag has been supplied at the CLI.

You can quickly check that the HTTP endpoint is up using `curl`:

```bash
curl -X GET "http://localhost:5052/eth/v1/node/version" -H  "accept:application/json"
```

The beacon node should respond with its version:

```json
{"data":{"version":"Lighthouse/v4.1.0-693886b/x86_64-linux"}
```

If this doesn't work, the server might not be started or there might be a
network connection error.

### I cannot query my node from a web browser (e.g., Swagger)

By default, the API does not provide an `Access-Control-Allow-Origin` header,
which causes browsers to reject responses with a CORS error.

The `--http-allow-origin` flag can be used to add a wild-card CORS header:

```bash
lighthouse bn --http --http-allow-origin "*"
```

> **Warning:** Adding the wild-card allow-origin flag can pose a security risk.
> Only use it in production if you understand the risks of a loose CORS policy.

[OpenAPI]: https://ethereum.github.io/beacon-APIs/
[ssh_tunnel]: https://www.ssh.com/academy/ssh/tunneling/example