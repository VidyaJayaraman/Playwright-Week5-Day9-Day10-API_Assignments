import { expect, test } from "@playwright/test"

let instanceUri = "https://dev201012.service-now.com"
let credUser = "YWRtaW46NWxyOExVTiFnK2JN"
let incidentId: any;


//******************************Create Incident*************************************

test("Create new Change Request by Post", async ({ request }) => {

    const respIncident = await request.post(`${instanceUri}/api/now/table/incident`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + credUser,
        },
        data: {
            "short_description": "Windows OS issue",
            "description": "Lenevo Think Pad "
        }
    })

    const respIncId = await respIncident.json();
    console.log(respIncId);
    incidentId = respIncId.result.sys_id;
    console.log(`Created Incident Sys_Id is ${incidentId}`)
    const respIncIdStatus = respIncident.status()
    expect(respIncIdStatus).toBe(201);
    console.log(`resp statuscode post Inc req is  ${respIncIdStatus}`)

})

//******************************Retrieve the newly Created Incident Using GET*************************************

test("GET Incident created by Post Request with Sys_id", async ({ request }) => {

    const respGetIncident = await request.get(`${instanceUri}/api/now/table/incident/${incidentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + credUser,
        }
    })

    const respGetIncId = await respGetIncident.json();
    console.log(respGetIncId);
    const respGetIncIdStatus = respGetIncident.status()
    expect(respGetIncIdStatus).toBe(200);
    console.log(`resp statuscode post Inc req is  ${respGetIncIdStatus}`)

})

//******************************Modify the Newly Created Incident Using Patch *************************************

test("Modify Using Patch", async ({ request }) => {

    const respPatchIncident = await request.patch(`${instanceUri}/api/now/table/incident/${incidentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + credUser,
        },
        data: {
            "short_description": "Batter Issue",

        }
    })

    const respPatchInc = await respPatchIncident.json();
    console.log(respPatchInc);
    const shortDesp = respPatchInc.result.short_description;
    console.log(`Modified Short Description is  ${shortDesp}`)
    const respPatchIncStatus = respPatchIncident.status()
    expect(respPatchIncStatus).toBe(200);
    console.log(`resp statuscode post Inc req is  ${respPatchIncStatus}`)

})


//******************************Modify the Newly Created Incident Using Put *************************************

test("Modify Using Put", async ({ request }) => {

    const respPutIncident = await request.put(`${instanceUri}/api/now/table/incident/${incidentId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + credUser,
        },
        data: {
            "description": "Mac-Book Pro",

        }
    })

    const respPutInc = await respPutIncident.json();
    console.log(respPutInc);
    const desp = respPutInc.result.description;
    console.log(`Modified Description is  ${desp}`)
    const respPutIncStatus = respPutIncident.status()
    expect(respPutIncStatus).toBe(200);
    console.log(`resp statuscode post Inc req is  ${respPutIncStatus}`)

})


//******************************DELETE the Newly Created Incident Using Sys_Id*************************************

test("DELETE the Newly Created Incident Using Sys_Id", async ({ request }) => {

    const respDeleteIncident = await request.delete(`${instanceUri}/api/now/table/incident/${incidentId}`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + credUser,
        }
    })


    const respDeleteIncIdStatus = respDeleteIncident.status()
    expect(respDeleteIncIdStatus).toBe(204);
    console.log(`resp statuscode Delete Inc req is  ${respDeleteIncIdStatus}`)

})