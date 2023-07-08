import  SanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
 
export const client = SanityClient({
  projectId:import.meta.env.VITE_REACT_SANITY_PROJECT_ID,
  dataset:import.meta.env.VITE_REACT_SANITY_DATASET,
  apiVersion:import.meta.env.VITE_REACT_SANITY_API_VERSION,
  useCdn: import.meta.env.VITE_REACT_SANITY_USECDN,
  token:import.meta.env.VITE_REACT_SANITY_TOKEN, 
  ignoreBrowserTokenWarning: true
})
const builder = ImageUrlBuilder(client);
export const urlFor = (source:string | string[]) => builder.image(source);
