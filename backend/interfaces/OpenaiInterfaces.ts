import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { CreateChatCompletionResponse } from 'openai';

export interface AiResponse
  extends AxiosResponse<CreateChatCompletionResponse, any> {
  data: CreateChatCompletionResponse;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: any;
  request?: any;
}
