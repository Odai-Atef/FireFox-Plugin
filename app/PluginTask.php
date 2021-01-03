<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PluginTask extends Model
{
    //
    protected $table="firefox_plugin_tasks";
    protected $fillable=["type","data","account_handler",'status'];
}
