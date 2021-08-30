import * as Yup from "yup";

export const formValues = {
  model: "",
  brand: "",
  frets: "",
  woodtype: "",
  description: "",
  price: "",
  available: "",
  shipping: false,
  images: [],
};

export const getValuesToEdit = (product) => {
  return {
    model: product.model,
    brand: product.brand._id,
    frets: product.frets,
    woodtype: product.woodtype,
    description: product.description,
    price: product.price,
    available: product.available,
    shipping: product.shipping,
    images: product.images,
  };
};

export const validation = () =>
  Yup.object({
    model: Yup.string().required("Model is required"),
    brand: Yup.string().required("Brand is required"),
    frets: Yup.number()
      .required("Frets are required")
      .oneOf([20, 21, 22, 24], "Only 20,21,22,24 frets are allowed"),
    woodtype: Yup.string().required("WoodType is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price cannot be lower than 1")
      .max(10000, "Price cannot be greater than 10000"),
    available: Yup.number().required("How many do we have in stock?"),
    shipping: Yup.boolean().required("Do we offer shipping?"),
    images: Yup.array(),
  });
