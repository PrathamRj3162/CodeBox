import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { Allotment } from "allotment";
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gruvboxDark } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/client/apiError";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

type ChildrenProps = {
  onCompleteExercise: () => void;
  isCompleted: boolean;
  completing: boolean;
  courseId?: number;
  chapterId?: number;
  exerciseNumber: number;
};

const MAX_HINT_FILES = 10;

const CodeEditorChildren = ({
  onCompleteExercise,
  isCompleted,
  completing,
  courseId,
  chapterId,
  exerciseNumber,
}: ChildrenProps) => {
  const { sandpack } = useSandpack();
  const [hintLoading, setHintLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  const requestHint = async () => {
    if (hintLoading || !courseId || !chapterId || exerciseNumber < 1) return;

    // Send only the files the student can see in the editor tabs
    const files: Record<string, string> = {};
    for (const path of sandpack.visibleFiles.slice(0, MAX_HINT_FILES)) {
      const code = sandpack.files[path]?.code;
      if (typeof code === "string") files[path] = code;
    }

    setHintLoading(true);
    try {
      const result = await axios.post("/api/exercise/hint", {
        courseId,
        chapterId,
        exerciseId: exerciseNumber,
        files,
      });
      setHint(result.data.hint);
      setRemaining(
        typeof result.data.remaining === "number" ? result.data.remaining : null
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not get a hint right now."));
    } finally {
      setHintLoading(false);
    }
  };

  return (
    <div className="font-game absolute bottom-42 flex gap-5 right-5">
      <Button
        variant={"pixel"}
        size={"lg"}
        className="text-xl"
        onClick={requestHint}
        disabled={hintLoading || exerciseNumber < 1}
      >
        {hintLoading ? "Thinking..." : "AI Hint"}
      </Button>
      <Button
        variant={"pixel"}
        size={"lg"}
        className="text-xl"
        onClick={() => sandpack.runSandpack()}
      >
        Run Code
      </Button>
      <Button
        variant={"pixel"}
        className="bg-[#a3e534] text-xl"
        size={"lg"}
        onClick={() => onCompleteExercise()}
        disabled={isCompleted || completing}
      >
        {isCompleted ? "Already Completed !" : "Mark Completed !"}
      </Button>

      <Dialog open={hint !== null} onOpenChange={(open) => !open && setHint(null)}>
        <DialogContent className="font-game">
          <DialogHeader>
            <DialogTitle className="text-2xl">AI Hint</DialogTitle>
            <DialogDescription>
              {remaining !== null ? `${remaining} hints left today` : "A nudge, not the answer."}
            </DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-lg">{hint}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function CodeEditor({ courseExerciseData, loading }: Props) {
  const { exerciseslug } = useParams();
  const exerciseIndex =
    courseExerciseData?.exercises?.findIndex(
      (item) => item.slug == exerciseslug,
    ) ?? -1;
  const hasExercise = exerciseIndex >= 0;

  // Remember which exercise was completed in this session, so the button
  // switches to "Already Completed" right away and cannot be clicked again.
  const exerciseKey = `${courseExerciseData?.courseId}-${courseExerciseData?.chapterId}-${exerciseIndex + 1}`;
  const [completedKey, setCompletedKey] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  const savedAsCompleted = hasExercise
    ? Boolean(
        courseExerciseData?.completedExercise?.find(
          (item) => item?.exerciseId == exerciseIndex + 1,
        ),
      )
    : false;
  const isCompleted = savedAsCompleted || completedKey === exerciseKey;

  const onCompleteExercise = async () => {
    if (!courseExerciseData || !hasExercise || completing || isCompleted) {
      return;
    }
    setCompleting(true);
    try {
      // XP is decided by the server from the stored exercise
      const result = await axios.post("/api/exercise/complete", {
        courseId: courseExerciseData.courseId,
        chapterId: courseExerciseData.chapterId,
        exerciseId: exerciseIndex + 1,
      });
      setCompletedKey(exerciseKey);
      toast.success(
        result.data?.alreadyCompleted
          ? "Already completed!"
          : `Exercise Completed! +${result.data?.xpEarned ?? 0} XP`,
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not save your progress. Please try again."),
      );
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="h-full">
      <SandpackProvider
        //@ts-ignore
        template={courseExerciseData?.editorType ?? "react"}
        theme={gruvboxDark}
        style={{
          height: "100vh",
        }}
        files={courseExerciseData?.exerciseData?.exercisesContent?.starterCode}
        options={{
          autorun: false,
          autoReload: false,
        }}
      >
        <SandpackLayout
          style={{
            height: "100%",
          }}
        >
          <Allotment defaultSizes={[50, 50]}>
            <Allotment.Pane minSize={400}>
              <div className="relative h-full">
                <SandpackCodeEditor
                  showTabs
                  style={{
                    height: "100%",
                  }}
                />
                <CodeEditorChildren
                  onCompleteExercise={onCompleteExercise}
                  isCompleted={isCompleted}
                  completing={completing}
                  courseId={courseExerciseData?.courseId}
                  chapterId={courseExerciseData?.chapterId}
                  exerciseNumber={hasExercise ? exerciseIndex + 1 : 0}
                />
              </div>
            </Allotment.Pane>
            <Allotment.Pane minSize={400}>
              <SandpackPreview
                showNavigator
                showOpenInCodeSandbox={false}
                showOpenNewtab
                style={{
                  height: "100%",
                }}
              />
            </Allotment.Pane>
          </Allotment>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;
