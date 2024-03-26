<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_contracts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('contractor_id')->constrained();
            $table->foreignUuid('project_id')->constrained()->onDelete('cascade');
            $table->string('work');
            $table->date('start_date');
            $table->date('completion_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_contracts');
    }
};
