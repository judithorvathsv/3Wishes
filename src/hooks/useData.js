import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (endPoint, customConfig, dependencyArray) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {    
            setIsLoading(true)   

            apiClient
                .get(endPoint, customConfig)
                .then((res) => {
                    /*get all product on the whole page*/
                    if(endPoint === "/products" && data && data.products && customConfig.params.page !==1){
                        setData(prev => ({
                            ...prev, products: [...prev.products, ...res.data.products]
                        }))
                    }
                    else{
                        setData(res.data) 
                    }                
                    setIsLoading(false)     
                })               
                .catch((err) => {
                    setError(err.message)
                    setIsLoading(false)  
                    });

                 
        }, dependencyArray ? dependencyArray : [] );

    return { data, error, isLoading };
};

export default useData;
