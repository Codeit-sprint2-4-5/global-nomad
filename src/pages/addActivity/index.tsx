import Layout from '@/components/common/layout/Layout';
import SideNavMenu from '@/components/common/sideNavMenu/SideNavMenu';
import AddActivityForm from '@/components/domain/addActivity/AddActivityForm';
import styles from './AddActivityPage.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function AddACtivity({ isEdit = false, activityId }: { isEdit?: boolean; activityId?: number }) {
  return (
    <Layout>
      <section className={cn('content')}>
        <SideNavMenu />
        <AddActivityForm isEdit={isEdit} activityId={activityId} />
      </section>
    </Layout>
  );
}
