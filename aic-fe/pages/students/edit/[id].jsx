import { AddEdit } from 'components/students';
import { studentService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const student = await studentService.getById(params.id);

    return {
        props: { student }
    }
}