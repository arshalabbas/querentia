import {
  ReportValidation,
  ReportValidationType,
} from "@/lib/validation/ReportValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextInput } from "./TextInput";
import { postReport } from "@/lib/actions/report.actions";

interface Props {
  id: string;
  postId: string;
  postType: string;
}

const ReportModel = ({ id, postId, postType }: Props) => {
  const { register, handleSubmit } = useForm<ReportValidationType>({
    resolver: zodResolver(ReportValidation),
  });
  const onSubmit = async (values: ReportValidationType) => {
    await postReport({
      reason: values.reason,
      postId,
      postType,
    });
  };
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput name="reason" register={register} label="Reason" />
          <button type="submit">Report</button>
        </form>
      </div>
    </dialog>
  );
};

export const openReportModel = (id: string) => {
  (document.getElementById(id) as HTMLDialogElement)?.showModal();
};

export default ReportModel;
