import { gql } from '@apollo/client';

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`;

export const GET_UNIQUE_BRAND = gql`
  query GetUniqueBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
    }
  }
`;

export const GET_BRAND_MODELS = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

export const GET_UNIQUE_MODEL = gql`
  query GetUniqueModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
    }
  }
`;