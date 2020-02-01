<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Expense;
use Faker\Generator as Faker;

$factory->define(Expense::class, function (Faker $faker) {
    $category = $faker->randomElement(['Shopping', 'Healthcare', 'Clothing', 'Fare', 'Personal', 'Others']);

    return [
        'title' => $faker->firstName,
        'description' => $faker->text(50),
        'category' => $category,
        'price' => $faker->numberBetween($min = 1, $max = 1000),
        'user_id' => $faker->numberBetween($min = 1, $max = 2)
    ];
});
