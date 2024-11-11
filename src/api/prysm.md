---
id: public-api
title: Beacon Node API
sidebar_label: Beacon Node API 
description: This section contains information about the official beacon API
---

# Beacon Node API

Prysm supports the official [Eth Beacon Node API specification](https://ethereum.github.io/beacon-APIs/), the official API standard developed by the Ethereum R&D team. The specification describes a RESTful set of endpoints which should be implemented by an ETH beacon node or a third-party service. This reduces the overhead of having to learn a new set of APIs when trying out a different client, and it allows network participants to reliably talk to each other over HTTP.

:::warning

The official Ethereum specification contains multiple definitions
As of the time of writing, there are three definitions: [v1](https://ethereum.github.io/beacon-APIs/?urls.primaryName=v1), [v2.x.x](https://ethereum.github.io/beacon-APIs/) and [dev](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev). `dev` is an unstable version and supporting it is **not** to be expected.

:::

## Performing requests against a local Prysm node

:::danger Do not publicly expose the API
The API's purpose is a means of communication between your beacon node and your validator client. Because of this it is not protected against external malicious users. Some endpoints are vulnerable to Denial-of-Service attacks, while others may disclose information about your beacon node. The communication between the beacon node and the validator client should be done privately, either on the same machine or through an SSH connection.
:::

:::warning
`http-host` and `http-port` have replaced `--grpc-gateway-host` and `--grpc-gateway-port` respectively.
:::

The API is exposed by default on `127.0.0.1:3500`. The host can be changed by manipulating the `--http-host` flag and the port can be modified with the `--http-port` flag. 

Performing a request is straightforward - simply concatenate the host with the port and the API's URL, providing any required URL and query parameters. As an example, the finalized state's root can be obtained using:
```
http://127.0.0.1:3500/eth/v1/beacon/states/finalized/root
```
Notice that in this example the `{state_id}` URL parameter has been replaced with the literal value `finalized`. Please read the specification carefully to understand how each endpoint behaves.

## Disabling the API

By default the beacon node runs with all available set of APIs enabled. You might want to disable one or more APIs, for example for security reasons. The `--http-modules` flags allows fine-grained control over which APIs are available on your node.


## Tips and Recommendations

If you're experiencing timeouts when using endpoints that require passing a `state_id`, such as `/eth/v1/beacon/states/{state_id}/validators`, and you pass in a state more than a few epochs in the past, consider lowering the value of the `--slots-per-archive-point` flag. The smaller the value, the faster it is to fetch states. For historical state fetching we recommend setting the value to `64` or even `32`. Mind you that decreasing the value will result in the beacon DB taking much more space. Unfortunately there's a trade-off between speed and storage size.

# Prysm Public API

:::info This API is only used by Prysm
:::

One of the required components of nodes in the Ethereum beacon chain network is to expose an API server for outside interaction. This API is critical for running validators on Ethereum, as validator clients can connect to nodes and query their API to figure out their assigned duties, to submit block proposals, and more. Prysm's Ethereum consensus API schema is maintained in Prysm itself here: [github.com/prysmaticlabs/prysm/proto](https://github.com/prysmaticlabs/prysm/tree/develop/proto) and is implemented by Prysm beacon nodes and validators.

Prysm implements its API by using the popular [gRPC](https://grpc.io) project created by Google, providing highly advanced functionality for Ethereum consensus. Interacting with the API requires the use of protocol buffers, also known as protobuf. These [protocol buffer](https://developers.google.com/protocol-buffers/). For information on the functionality of gRPC and protocol buffers more generally, see the [gRPC guide](https://grpc.io/docs/guides/).

## Calling the API on your local beacon node

:::danger Do not publicly expose the API
The API's purpose is a means of communication between your beacon node and your validator client. Because of this it is not protected against external malicious users. Some endpoints are vulnerable to Denial-of-Service attacks, while others may disclose information about your beacon node. The communication between the beacon node and the validator client should be done privately, either on the same machine or through an SSH connection.
:::

By default, the beacon node exposes a [gRPC](https://grpc.io) API on host `127.0.0.1:4000`, which is accessed by the validator client. This is not an HTTP endpoint, so you will not be able to perform API queries via HTTP on that port. 
Instead of using a regular curl command you will need to use `gRPCurl` or a similar tool to make API calls via your terminal.

:::warning as of v5.1.1 HTTP for gRPC endpoints is no longer supported
As of v5.1.1, gRPC gateway was removed from Prysm and no longer supports HTTP for gRPC endpoints.
Some Prysm specific endpoints are still supported via REST under the prysm/v1 namespace.
:::

### gRPC tooling and resources

* [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc)
* [Google's API Style Guide](https://cloud.google.com/apis/design/)
* [Language reference for proto 3](https://developers.google.com/protocol-buffers/docs/proto3)
* [Protocol Buffer Basics: Go](https://developers.google.com/protocol-buffers/docs/gotutorial)
* [Transcoding gRPC to JSON/HTTP using Envoy](https://blog.jdriven.com/2018/11/transcoding-grpc-to-http-json-using-envoy/)
* [gRPCurl](https://github.com/fullstorydev/grpcurl)

# Keymanager APIs

Prysm supports the official [Keymanager APIs](https://github.com/ethereum/keymanager-APIs), a REST API specification for validator clients to provide an alternative to CLI commands for onboarding and offboarding their validator keys on the consensus client. 

All Prysm Validator Client APIs require the use of the `--rpc` flag. 

Please refer to the "local keystores APIs" to manage locally stored validator keys, and to the "remote keystores APIs" to manage public key settings for Web3Signer.

## Authentication
A JWT token is needed to use the Keymanager APIs. This token is automatically generated and can be found on the second line of the `auth-token` file, located in the Prysm wallet directory. The Prysm wallet directory is defined by the `--wallet-dir` flag default or custom value, and is also displayed in the Validator Client logs at start.

The JWT token itself is directly displayed at the Validator Client start as well, in this log:


    INFO rpc: http://127.0.0.1:7500/initialize?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.ck3J6tcvHcI74IiFjyJqcBH-MmNAq-fMr0ncyZkGvFM


The token needs to be copied and set in the header of the API request:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.ck3J6tcvHcI74IiFjyJqcBH-MmNAq-fMr0ncyZkGvFM


## Other Prysm specific errors and usecases

Prysm comes with some client specific edge cases and usages. These cases will be documented on the [Keymanager API repos under flows](https://github.com/ethereum/keymanager-APIs/tree/master/flows/client-specific/prysm).

