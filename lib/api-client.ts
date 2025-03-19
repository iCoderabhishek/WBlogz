
import { IImage } from "@/models/Image.model";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any; 
    headers?: Record<string, string>
    
}

export type imageFormData = Omit<IImage, "_id">

class ApiClient {
    private async fetch<T>(endpoint: string,
        options: FetchOptions = {},


    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options
        
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers

        }

       const response =  await fetch(`/api${endpoint}`, {
            method, 
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined

       })
        
      if (!response.ok) {
          throw new Error(await response.text())
      }
        return response.json()
    };



    async getImages() {
        return this.fetch<IImage[]>("/images")
    }

    async getAImage(id: string) {
        return this.fetch<IImage>(`/images/${id}`)
    }

     async createImage(imageData: imageFormData) {
    return this.fetch("/images", {
      method: "POST",
      body: imageData,
    });
  }
};

export const apiClient = new ApiClient()


