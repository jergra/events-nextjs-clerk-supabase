function toRadians(val: any){
    var PI = 3.1415926535;
    return val / 180.0 * PI;
}

export function findDistance(lat1: any, lat2: any, lon1: any, lon2: any) {
    var R = 6371e3; // R is earth’s radius
    var lat1radians = toRadians(lat1);
    var lat2radians = toRadians(lat2);
 
    var latRadians = toRadians(lat2-lat1);
    var lonRadians = toRadians(lon2-lon1);
 
    var a = Math.sin(latRadians/2) * Math.sin(latRadians/2) +
         Math.cos(lat1radians) * Math.cos(lat2radians) *
         Math.sin(lonRadians/2) * Math.sin(lonRadians/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 
    var d = R * c;
    
    return d
}
 
 