<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // header('Access-Control-Allow-Origin:*');
        // header('Access-Control-Allow-Headers: Content-type, X-Auth-Token, Authorization, Origin');
        // return $next($request);

        // header("Access-Control-Allow-Origin: *");
        $headers = [
            // for angular localhost:4200   
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'POST,GET,OPTIONS,PUT,DELETE',
            'Access-Control-Allow-Headers' => 'Origin, Content-Type, X-Auth-Token, X-Requested-With, Authorization',
            'Access-Control-Allow-Credentials' => 'true'
        ];
        if ($request->getMethod() == "OPTIONS"){
            return response()->json('OKEZZZZ',200,$headers);
        }
        $response = $next($request);
        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }
        return $response;
    }
}
