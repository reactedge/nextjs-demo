import CheckLogin from "@/components/auth/CheckLogin";
import Editor from "@/components/common/Editor";

export default function WordEditorPage() {
    return (
        <CheckLogin>
            <Editor />
        </CheckLogin>
    );
}
