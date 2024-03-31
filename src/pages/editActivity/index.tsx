import AddACtivity from '../addActivity';

export default function EditActivity({ activityId = 476 }: { activityId: number }) {
  return <AddACtivity isEdit={true} activityId={activityId} />;
}
