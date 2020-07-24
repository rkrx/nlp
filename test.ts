import { fail } from "https://deno.land/std/testing/asserts.ts";

import { NLP } from 'https://raw.githubusercontent.com/michael-spengler/nlp/master/nlp.ts'

import {exampleTrainingData} from 'https://raw.githubusercontent.com/michael-spengler/nlp/master/training-data.ts'


const trainingData = JSON.parse(exampleTrainingData)
const languages = ['en']

Deno.test("training and getting an appropriate response ", async (): Promise<void> => {

    const clientId = (await NLP.train(trainingData.documents, trainingData.answers, languages)).clientId

    if (typeof(clientId) === "string" && Number(clientId) > 1595612098416){
        assertAppropriateResponse(clientId)
    } else {
        fail("error during training")
    }
});

async function assertAppropriateResponse(clientId: string): Promise<void> {
    const answer = await NLP.getResponse('Hi', 'en', clientId)

    if (answer.indexOf('Hi') === -1) {
        fail("error during getting an appropriate answer")
    }

}