import { useState, useEffect } from 'react';

import { Link } from 'components';
import { studentService, gradeService } from 'services';

export default Index;

function Index() {
    const [grade_id, setGradeId] = useState(null);
    const setSearch = event => {

        setGradeId(event.target.value);
      };
    const [students, setStudents] = useState('');
    const [grades, setGrades] = useState(null);
    const handleSearch= event => {
        studentService.getAll({grade_id}).then(x => setStudents(x));
    }
    useEffect(() => {
        studentService.getAll().then(x => setStudents(x));
        gradeService.getAll().then(g => setGrades(g))
    }, []);

    function deleteUser(id) {
        setStudents(students.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        studentService.delete(id).then(() => {
            setStudents(students => students.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Students</h1>
            <div class="form-row align-items-center form-inline">
                <Link href="/students/add" className="btn btn-sm btn-success mb-2 mr-5">Add Student</Link>
                <div class="col-auto form-group">
                    <select name="title" value={grade_id} onChange={setSearch} className={`custom-select mb-2`}>
                    <option value=""> Select grade</option>
                        {grades && grades.map((grade) => (
                            <option value={grade.id}>{grade.name}</option>
                        ))}
                    </select>
                    <button onClick={handleSearch} type="button" className="btn btn-secondary mb2 ml-4">Search</button>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Grade</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map(student =>
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.grade.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/students/edit/${student.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(student.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={student.isDeleting}>
                                    {student.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!students &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {students && !students.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
