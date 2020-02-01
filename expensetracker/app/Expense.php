<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{    
    protected $fillable = ['title', 'description', 'category', 'price', 'user_id'];

        //table name
        protected $table = 'expenses';

        //primary key
        public $primaryKey = 'id';
    
        //timestamps
        public $timestamps = true;

        
    public function user()
    {
        return $this->belongsTo('App\User');    
    }
}
