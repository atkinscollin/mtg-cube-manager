import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        const logger = this.injector.get(LoggerService);

        let message: string, stackTrace: string;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = this.getServerMessage(error);
            stackTrace = this.getServerStack(error);
        } else {
            // Client Error
            message = this.getClientMessage(error);
            stackTrace = this.getClientStack(error);
        }

        // Always log errors
        logger.logError(message, stackTrace);
    }

    private getClientMessage(error: Error): string {
        return !navigator.onLine ? 'No Internet Connection'
            : error.message ? error.message : error.toString();
    }

    private getClientStack(error: Error): string {
        return error.stack;
    }

    private getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

    private getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return '';
    }
}
