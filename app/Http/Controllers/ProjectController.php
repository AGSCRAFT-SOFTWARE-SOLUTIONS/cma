<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Projects/IndexProject', ['projects' => Project::with('client')->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Project::create($request->validate([
            'name' => 'required',
            'location' => 'required',
            'category' => 'required',
            'client_id' => 'required|exists:clients,id',
            'budget' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'completion_date' => 'required|date|after:start_date',
            'description' => 'nullable',
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Project $project, Request $request)
    {
        $project->update($request->validate([
            'name' => 'required',
            'location' => 'required',
            'category' => 'required',
            'client_id' => 'required|exists:clients,id',
            'budget' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'completion_date' => 'required|date|after:start_date',
            'description' => 'nullable',
        ]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
    }
}
