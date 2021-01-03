<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Tasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('firefox_plugin_tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->string('data');
            $table->string('status');
            $table->string('account_handler');
            $table->timestamps();
            $table->dateTime('executed_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
