import { publicAxios } from "./api_config";

interface CoinTransactionConfig {
    userId: number;
    amount: number; 
    isMinus: boolean;
    title?: string;
    description?: string;
    isGenerateCode?: boolean;
    code?: string;
    vouchers?: number[];
    services?: number[];
    products?: { id: number; quantity: number }[];
  }
  
  export async function apiPostCoinTransaction(config: CoinTransactionConfig) {
    const url = `CoinTransaction`;
    const dataSend = {
      userId: config.userId,
      amount: config.amount,
      isMinus: config.isMinus,
      title: config.title,
      description: config.description,
      isGenerateCode: config.isGenerateCode,
      code: config.code,
      vouchers: config.vouchers,
      services: config.services,
      products: config.products,
    };
    return publicAxios.post(url, dataSend, { headers: { "Content-Type": "application/json" } });
  }