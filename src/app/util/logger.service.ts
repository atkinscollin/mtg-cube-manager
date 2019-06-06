import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoggerService {

    logError(message: string, stackTrace: string) {
        // TODO - The console.log is only for testing, this should be improved to log to a saved state instead.
        console.log(message);
        console.log(stackTrace);
    }
}
