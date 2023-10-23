<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use DB;
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
        $todos = auth()->user()->todos()->orderByDesc('position')->get();
        
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
        $position = auth()->user()->todos()->max('position') + 1;

        auth()->user()->todos()->create(array_merge($validated, [
            'position' => $position,
        ]));

        return redirect()->back();
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

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->back();
    }

    public function clearCompleted() {
        auth()->user()->todos()->where('completed', true)->delete();
        return redirect()->back();
    }

    public function updateOrder(Request $request)
    {
        $user = auth()->user();

        $draggableId = $request->input('draggableId');
        $sourceIndex = $request->input('sourceIndex');
        $destinationIndex = $request->input('destinationIndex');

        $sourcePosition = $user->todos()->count() - $sourceIndex;
        $destinationPosition = $user->todos()->count() - $destinationIndex;

        $todos = $user->todos()
            ->orderBy('position')
            ->get();

        // Get the todo to move
        $todoToMove = $user->todos()->where('position', $sourcePosition)->first();

        // If the source position is greater than the destination position, shift todos down
        if ($sourcePosition > $destinationPosition) {
            foreach ($todos as $todo) {
                if ($todo->position >= $destinationPosition && $todo->position < $sourcePosition) {
                    $todo->position += 1;
                    $todo->save();
                }
            }
        }
        // If the source position is less than the destination position, shift todos up
        elseif ($sourcePosition < $destinationPosition) {
            foreach ($todos as $todo) {
                if ($todo->position > $sourcePosition && $todo->position <= $destinationPosition) {
                    $todo->position -= 1;
                    $todo->save();
                }
            }
        }

        // Set the position of the moved todo to the destination position
        $todoToMove->position = $destinationPosition;
        $todoToMove->save();

        return redirect()->back();
    }
}
