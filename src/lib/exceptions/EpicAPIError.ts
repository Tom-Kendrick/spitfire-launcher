import type { EpicAPIErrorData } from '$types/game/authorizations';
import { HTTPError, type KyRequest, type KyResponse, type NormalizedOptions } from 'ky';

export class EpicAPIError extends HTTPError implements EpicAPIErrorData {
  public errorCode: string;
  public errorMessage: string;
  public numericErrorCode: number;
  public messageVars: string[];

  public continuation?: string;
  public continuationUrl?: string;
  public correctiveAction?: string;

  constructor(error: EpicAPIErrorData, request: KyRequest, response: KyResponse, options: NormalizedOptions) {
    super(response, request, options);

    this.name = 'EpicAPIError';
    this.message = error.errorMessage;

    this.errorCode = error.errorCode;
    this.errorMessage = error.errorMessage;
    this.numericErrorCode = error.numericErrorCode;
    this.messageVars = error.messageVars || [];

    this.continuation = error.continuation;
    this.continuationUrl = error.continuationUrl;
    this.correctiveAction = error.correctiveAction;
  }
}

export function isEpicAPIError(data: any): data is EpicAPIErrorData {
  return (data as EpicAPIErrorData)?.errorCode !== undefined || data instanceof EpicAPIError;
}
