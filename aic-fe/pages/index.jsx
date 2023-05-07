import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div>
            <h1>CRUD Student with react</h1>
            <p><Link href="/students">&gt;&gt; Manage Students</Link></p>
        </div>
    );
}
