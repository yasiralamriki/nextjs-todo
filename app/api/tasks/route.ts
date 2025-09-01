import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const tasksFilePath = path.join(process.cwd(), 'app', 'tasks.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(tasksFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.tasks);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return NextResponse.json({ error: 'Failed to read tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    // Read current tasks
    const fileContents = await fs.readFile(tasksFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Create new task
    const newTask = {
      id: Math.max(...data.tasks.map((t: any) => t.id), 0) + 1,
      name
    };
    
    // Add new task
    data.tasks.push(newTask);
    
    // Write back to file
    await fs.writeFile(tasksFilePath, JSON.stringify(data, null, 4));
    
    return NextResponse.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
