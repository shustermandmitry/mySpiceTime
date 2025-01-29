/**
 * @module components/AiCodingAssistant
 * @description Core AI coding assistant component for the SpiceTime architecture bootstrap.
 * Provides basic but essential functionality for AI-assisted development:
 * - File content viewing with syntax highlighting
 * - Error handling and loading states
 * - Scrollable content viewing
 * - Basic file information display
 * - Action buttons for code analysis and test generation
 *
 * Built using shadcn/ui components for a clean, consistent interface.
 */

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Code2, FileText, Loader2} from 'lucide-react';

/**
 * Represents a file in the AI assistant's context
 */
interface ContextFile {
    /** File system path */
    path: string;
    /** File contents */
    content: string;
    /** File extension/type */
    type: string;
}

/**
 * Assistant context state interface
 */
interface AssistantContext {
    /** Array of loaded files */
    files: ContextFile[];
    /** Currently active file */
    currentFile: ContextFile | null;
    /** Loading state flag */
    loading: boolean;
    /** Error message if any */
    error: string | null;
}

/**
 * Initial context state
 */
const initialContext: AssistantContext = {
    files: [],
    currentFile: null,
    loading: false,
    error: null
};

/**
 * AI Coding Assistant Component
 *
 * Provides a user interface for AI-assisted code development. Currently focuses on
 * file viewing and basic code analysis capabilities, serving as an MVP for the
 * SpiceTime architecture bootstrap phase.
 *
 * @component
 * @example
 * ```tsx
 * <AiCodingAssistant />
 * ```
 */
const AiCodingAssistant: React.FC = () => {
    // Context state management
    const [context, setContext] = useState<AssistantContext>(initialContext);

    /**
     * Processes a file for the AI assistant's context
     * @param file - File path to process
     */
    const processFile = async (file: { path: string }): Promise<void> => {
        setContext(prev => ({...prev, loading: true}));

        try {
            const content = await window.fs.readFile(file.path, {encoding: 'utf8'});
            setContext(prev => ({
                ...prev,
                currentFile: {
                    path: file.path,
                    content,
                    type: file.path.split('.').pop() || ''
                },
                loading: false
            }));
        } catch (err) {
            setContext(prev => ({
                ...prev,
                error: `Error processing file: ${err instanceof Error ? err.message : 'Unknown error'}`,
                loading: false
            }));
        }
    };

    /**
     * Renders the file viewer section based on current context
     * @returns JSX for the file viewer
     */
    const renderFileViewer = (): JSX.Element => {
        if (context.loading) {
            return (
                <div className="flex items-center justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin"/>
                </div>
            );
        }

        if (context.error) {
            return (
                <div className="text-red-500 p-4">
                    {context.error}
                </div>
            );
        }

        if (context.currentFile) {
            return (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FileText className="h-4 w-4"/>
                        <span>{context.currentFile.path}</span>
                    </div>
                    <ScrollArea className="h-96 w-full rounded-md border">
            <pre className="p-4 text-sm">
              {context.currentFile.content}
            </pre>
                    </ScrollArea>
                </div>
            );
        }

        return (
            <div className="text-gray-500 text-center p-6">
                <Code2 className="h-12 w-12 mx-auto mb-2"/>
                <p>Select a file to begin working with the AI assistant</p>
            </div>
        );
    };

    /**
     * Handles code analysis request
     * @todo Implement code analysis functionality
     */
    const handleAnalyzeCode = async (): Promise<void> => {
        // Future implementation
    };

    /**
     * Handles test generation request
     * @todo Implement test generation functionality
     */
    const handleGenerateTests = async (): Promise<void> => {
        // Future implementation
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>AI Coding Assistant</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    {renderFileViewer()}

                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            disabled={!context.currentFile}
                            onClick={handleAnalyzeCode}
                        >
                            Analyze Code
                        </Button>
                        <Button
                            disabled={!context.currentFile}
                            onClick={handleGenerateTests}
                        >
                            Generate Tests
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AiCodingAssistant;