
import { expect, test } from "@playwright/test"
let oauthTokenNew: any;
let opporId: any;
let instanceUri: any;
let firstOppId: any

// Geneate Oauth

test('Generate Oauth Token', async ({ request }) => {

    const respOauth = await request.post("https://login.salesforce.com/services/oauth2/token", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Connection": "Keep-alive"
        },
        form: {
            "grant_type": "password",
            "client_id": "3MVG94Jqh209Cp4QSk9Ar9R9auADjq0P1dreOKJPjloNEipH5k4yImzto_.NvtH2n0YX2GKQihaeKD1KUHu0n",
            "client_secret": "AA4BD9AA037EC2C693F853334A8E26DAE5E981A2F58D4F09C7EBB11B99BCAEEB",
            "username": "viddhu.j@gmail.com",
            "password": "Testcrm@789!"
        }
    })

    const respOauthJson = await respOauth.json();
    console.log(respOauthJson);
    oauthTokenNew = respOauthJson.access_token;
    console.log(`Oauth Token is ${oauthTokenNew}`)
    instanceUri = respOauthJson.instance_url;
    console.log(`Instance URL  is ${instanceUri}`)


})


// **************************Create Opportunity *************************************

test('Create Opportunity Id', async ({ request }) => {

    const respOppor = await request.post(`${instanceUri}/services/data/v60.0/sobjects/Opportunity`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + oauthTokenNew
            // "Authorization": "Bearer 00DGB000001tI9q!AQ0AQN1R3YNTc.T1ZVcTeZY.A5eOAcrlgn8_gHm8xzsLGX36wUN4Pc0wxn0tBh4H6ypBWmJv08V59NNeFhAtqSB0nImJvH.9"
        },
        data: {
            "Name": "Vidya Test mani",
            "StageName": "Qualification",
            "CloseDate": "2024-04-29"
        }
    })

    const respOpporId = await respOppor.json();
    console.log(respOpporId);
    opporId = respOpporId.id;
    console.log(`Created Opportunity Id is  ${opporId}`)
    const respOpporIdStatus = respOppor.status()
    expect(respOpporIdStatus).toBe(201);
    console.log(`resp statuscode post req is  ${respOpporIdStatus}`)


})


// ***************************************** Modify opportunity using patch ********************************
test('Modify Opportunity type and stage using Patch', async ({ request }) => {

    const patchOppor = await request.patch(`${instanceUri}/services/data/v60.0/sobjects/Opportunity/${opporId}`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + oauthTokenNew
            // "Authorization": "Bearer 00DGB000001tI9q!AQ0AQN1R3YNTc.T1ZVcTeZY.A5eOAcrlgn8_gHm8xzsLGX36wUN4Pc0wxn0tBh4H6ypBWmJv08V59NNeFhAtqSB0nImJvH.9"
        },
        data: {
            "Type": "New Customer",
            "StageName": "Prospecting"
        }
    })

    const patchOpporStatus = patchOppor.status()
    expect(patchOpporStatus).toBe(204);
    console.log(`resp statuscode patch is  ${patchOpporStatus}`)


})




//******************************************Get the first Opportunity ID*************************** */
test('Get All Opportunities and fetch first Opportunity Id', async ({ request }) => {

    const getOppor = await request.get(`${instanceUri}/services/data/v60.0/sobjects/Opportunity`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + oauthTokenNew,
            // "Authorization": "Bearer 00DGB000001tI9q!AQ0AQN1R3YNTc.T1ZVcTeZY.A5eOAcrlgn8_gHm8xzsLGX36wUN4Pc0wxn0tBh4H6ypBWmJv08V59NNeFhAtqSB0nImJvH.9"
        }
    })

    const respgetOppor = await getOppor.json();
    console.log(respgetOppor);
    firstOppId = respgetOppor.recentItems[0].Id;
    console.log(`First Opportunity Id is ${firstOppId}`)

    const respgetOppor_status = getOppor.status();
    expect(respgetOppor_status).toBe(200);
    console.log(`resp statuscode get req is  ${respgetOppor_status}`)



})


//****************************************Delete the first Id from the response retrieved from Get All Request****************************/
test('Delete the first Opportunity Id', async ({ request }) => {

    const delOppor = await request.delete(`https://testleaf24-dev-ed.develop.my.salesforce.com/services/data/v60.0/sobjects/Opportunity/${firstOppId}`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + oauthTokenNew
            // "Authorization": "Bearer 00DGB000001tI9q!AQ0AQN1R3YNTc.T1ZVcTeZY.A5eOAcrlgn8_gHm8xzsLGX36wUN4Pc0wxn0tBh4H6ypBWmJv08V59NNeFhAtqSB0nImJvH.9"
        }
    })

    const respDelOppor = delOppor.status();
    expect(respDelOppor).toBe(204);
    console.log(`resp statuscode delete req is  ${respDelOppor}`)

})

