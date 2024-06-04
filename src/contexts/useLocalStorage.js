import { useEffect, useState } from "react";


export function useLocalStorage(key, initialValue = null) {

    // Helper function to parse date strings back into proper JavaScript dates
    // Source: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
    if (window.JSON && !window.JSON.dateParser) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[|\\]$/;
       
        JSON.dateParser = function (key, value) {
            if (typeof value === 'string') {
                var a = reISO.exec(value);
                if (a)
                    return new Date(value);
                a = reMsAjax.exec(value);
                if (a) {
                    var b = a[1].split(/[-+,.]/);
                    return new Date(b[0] ? +b[0] : 0 - +b[1]);
                }
            }
            return value;
        };
    
    }

    const [value, setValue] = useState(() => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data, JSON.dateParser) : initialValue;
        } catch {
            return initialValue;
        }
    });


    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value, setValue]);

    
  
    return [value, setValue];
}