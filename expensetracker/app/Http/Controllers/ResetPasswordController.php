<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        // return $request->all();
        if (!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email) {
        $oldtoken = DB::table('password_resets')->where('email', $email)->first();
        if($oldtoken) {
            return $oldtoken;
        }

        $token = Str::random(60);
        $this->saveToken($email, $token);
        return $token;
    }

    public function saveToken($email, $token){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Email does not exist on database'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset Email is sent successfully. Please check your inbox.'
        ], Response::HTTP_OK);
    }
}
