<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;
use Illuminate\Support\Facades\Auth;
use App\User;
// use Auth;
class ExpenseController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');

    }

    public function index()
    {
        // $userid = Auth::user()->id;
        $userid = auth()->user()->id;
        $user = User::find($userid);
        return $user->expenses;
    }

    public function create()
    {
        
    }


    public function store(Request $request)
    {
        $expense = new Expense();
        $expense->title = $request->title;
        $expense->description = $request->description;
        $expense->category = $request->category;
        $expense->price = $request->price;  
        // $expense->user_id = \Auth::id();
        // $expense->user_id = Auth::user()->id;
        // $expense->user_id = Auth::id();
        // $user = Auth::user();
        
        $expense->user_id = auth()->user()->id;


        $expense->save();
        return $expense;
    }

    public function show($id)
    {
        return Expense::find($id);
    }


    public function edit($id)
    {
        
    }

    public function update(Request $request, $id)
    {
        if ($id != null) {
            $expense = Expense::where('id', $id)->update($request->all()); 
        }   
        return $expense; 
    }


    public function destroy($id)
    {

        $expense = Expense::find($id);
        $expense->delete();
    }
}
