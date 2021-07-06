const IPFS = require('ipfs');
export let node = undefined;

export async function initIpfs() {
	const options = {
		 "allowNew": true,
     "API": {
        "HTTPHeaders": {
            "Access-Control-Allow-Origin": [
                "*"
            ],
            "Access-Control-Allow-Methods": [
                "GET",
                "POST"
            ],
            "Access-Control-Allow-Headers": [
                "Authorization"
            ],
            "Access-Control-Expose-Headers": [
                "Location"
            ],
            "Access-Control-Allow-Credentials": [
                "true"
            ]
        }
     }
    }
    try {
       node = await  IPFS.create(options)
    }
    catch { return node };
    return node
}

export async function sendToIpfs(data) {
    await node;
    data = JSON.stringify(data);
    let results = node.add(data);
    return results;
}

export async function sendToIpns(data) {
    await node;
    let results = await sendToIpfs(data);
    let addr = `/ipfs/${results.path}`;

    let ipnsObj = await node.name.publish(addr);
    return ipnsObj;
}

export async function readStringfromIpfs(cid) {
    const stream = node.cat(cid)
    let data = []

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data.push(chunk)
    }
    data = String.fromCharCode.apply(null, data[0]);
    return data.valueOf()
}

export async function readJsonfromIpfs(cid) {
    let data = await readStringfromIpfs(cid);
    data = JSON.parse(data);
    return data;
}

export async function getSelfAdx() {
    let node1 = await initIpfs();
    return await ((await node1).key.list())
}

export async function stop() {
    await node.stop();
}

