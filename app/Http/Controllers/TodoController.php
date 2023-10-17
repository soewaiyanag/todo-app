<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = auth()->user()->todos()->latest()->get();
        
        $filterCompletedQuery = request()->query('completed');
        $filterCompleted = $filterCompletedQuery === 'true' ? true : ($filterCompletedQuery == 'false' ? false : null);

        return Inertia::render('Todo', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'todos' => $todos,
            'filterCompleted' => $filterCompleted
        ]);
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
        $validated = $request->validate([
            'task' => 'required|string|max:255'
        ]);

        $request->user()->todos()->create($validated);

        return redirect(route('home'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $todo->update([
            'completed' => !$request->completed
        ]);

        return redirect(route('home'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect(route('home'));
    }
}
