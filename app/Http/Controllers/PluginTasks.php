<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PluginTask;

class PluginTasks extends Controller
{
    //
    function index(Request $request)
    {
        $validated = $request->validate([
            'account_handler' => 'required|max:45',
        ]);
        $tasks = PluginTask::where("account_handler", $request->input("account_handler"))
            ->where("status", "new")
            ->orderBy("id", "desc")->first();
        if ($tasks) {
            return $tasks;
        }
        return [];
    }

    function executed(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'account_handler' => 'required',
        ]);
        return ["status" => PluginTask::where("account_handler", $request->input("account_handler"))
            ->where("id", $request->input("id"))
            ->where("status", 'new')
            ->update(["executed_at" => date("Y-m-d H:i:s"), "status" => "executed"])];
    }

    function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|max:45',
            'data' => 'required|max:45',
            'rule_name' => 'required|max:45',
            'account_handler' => 'required|max:45',
        ]);
        $data = $request->input();
        $data['status'] = "new";
        return PluginTask::create($data);
    }
}
