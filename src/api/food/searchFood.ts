import { RequestHandler, Request, Response, Express } from 'express'
import { MongoClient } from 'mongodb'
import axios from 'axios';
import internal from 'stream';
import { USDA_API_KEY } from '../../index';

var token = require('./createJWT.js');
var storage = require('../tokenStorage.js');

export enum SearchFoodError {
    Ok = 0,
    ServerError
}

export type SearchFoodRequest = {
    query: string
    pageSize: number,
    start: number,
    jwtToken: any
}

export type SearchFoodResponse = {
    currentPage : number;
    foods: Food[] | null
    error: SearchFoodError
    jwtToken: any
}
export type Nutrient = {
    nutrientId: number
    nutrientName: string
    nutrientNumber : number
    unitName: string
    value: number
    foodNutrientId: number
}

export type Portion = {
    id: number,
    PortionName: string,
    gramWeight: number
}

export type Consumed = {
    portionId: number,
    quantity: number
}

export type Food = {
    fdcId : number
    description: string
    foodNutrients: Nutrient[]
    foodPortions: Portion[] | null
    foodConsumed: Consumed | null
}


function convertUsdaNutrient(nutrient: any): Nutrient {
  // @ts-ignore
  const converted = {
    nutrientId: nutrient.nutrientId,
    nutrientName: nutrient.nutrientName,
    nutrientNumber: nutrient.nutrientNumber,
    unitName: nutrient.unitName,
    value: nutrient.value,
    foodNutrientId: nutrient.foodNutrientId
  }

  return converted
}

function convertUsdaPortion(Portion: any): Portion {
  // @ts-ignore
  const converted = {
    id: Portion.id,
    PortionName: Portion.disseminationText,
    gramWeight: Portion.gramWeight
  }

  return converted
}

function convertUsdaFood(food: any): Food {
  // @ts-ignore
  const converted = {
    fdcId: food.fdcId,
    description: food.description,
    foodNutrients: food.foodNutrients.map(convertUsdaNutrient),
    foodPortions: null,
    foodConsumed: null
  }

  return converted
}


/* Returns a function of type `RequestHandler` to be used in a route. */
export function searchFood(app: Express, client: MongoClient): RequestHandler {
  return async (req: Request, res: Response) => {
    let response: SearchFoodResponse = { currentPage: 0, foods: null, error: SearchFoodError.Ok, jwtToken: null }

    try {
      const { query, pageSize, start, jwtToken } = req.body as SearchFoodRequest
      const db = client.db()

      /* call api to get responses */
      let body = {
        query: `*${query}*`,
        dataType: [
          'SR Legacy'
        ],
        pageSize: pageSize,
        pageNumber:start
      }

      let result = await axios.post(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}`, body);
      let searchResults = result.data;

      // convert results

      response = {
        currentPage : start,
        foods : searchResults.foods.map(convertUsdaFood),
        error : SearchFoodError.Ok,
        jwtToken : null
      }
    } catch (e) {
      response = {
        currentPage : 0,
        foods: null,
        error: SearchFoodError.ServerError,
        jwtToken: null
      }
    }

    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
      response.jwtToken = refreshedToken;
    }
    catch(e)
    {
      console.log(e.message);
    }

    res.status(200).json(response)
  }
}
