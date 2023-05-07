import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { studentService, alertService, gradeService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const student = props?.student;
    const isAddMode = !student;
    const router = useRouter();
    const [grades, setGrades] = useState(null);
    useEffect(() => {
        gradeService.getAll().then(g => setGrades(g))
    }, []);

    // form validation rules
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        grade_id: Yup.string()
            .required('grade_id is required'),
        date_of_birth: Yup.date()
            .required('date_of_birth is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    if (!isAddMode) {
        const { ...defaultValues } = student;
        formOptions.defaultValues = defaultValues;
    }


    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createStudent(data)
            : updateStudent(student.id, data);
    }

    function createStudent(data) {
        return studentService.create(data)
            .then(() => {
                alertService.success('Student added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateStudent(id, data) {
        return studentService.update(id, data)
            .then(() => {
                alertService.success('Student updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isAddMode ? 'Add Student' : 'Edit Student'}</h1>
            <div className="form-row">
            <div className="form-group col">
                    <label>Grade</label>
                    <select name="grade_id" {...register('grade_id')} className={`form-control ${errors.grade_id ? 'is-invalid' : ''}`}>
                        <option value="">Select grade</option>
                        {grades && grades.map((grade) => (
                            <option value={grade.id} selected={grade.id == (student && student.grade_id)}>{grade.name}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.grade?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label> Name</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Date of birth</label>
                    <input name="date_of_birth" type="date" {...register('date_of_birth')} className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date_of_birth?.message}</div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/students" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}