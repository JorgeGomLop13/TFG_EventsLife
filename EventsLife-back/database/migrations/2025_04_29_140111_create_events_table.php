<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
			$table->string('name');
			$table->string('description');
			$table->string('location');
			$table->date('date');
			$table->time('start_date');
			$table->time('end_date');
			$table->foreignId('organizer_id')->constrained('users');
			$table->foreignId('category_id')->constrained('categories');
			$table->string('price');
			$table->string('capacity');
			$table->mediumText ('image')->nullable();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
