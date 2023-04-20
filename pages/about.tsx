import styles from '@/styles/Home.module.scss';
import Navbar from '@/components/Navbar';
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

type DataProps = {
  data: Record<string, any>
}

export default function About({ data }: DataProps) {
    const officerData = JSON.parse(JSON.stringify(data, null, 2));
    return (
        <>
        <Navbar/>
        {officerData.map((officer: PersonInfoProps, index: number)=>(
            <PersonInfo key={index} name={officer.name} major={officer.major} year={officer.year} photo={officer.photo}/>
        ))}
        <main className={styles.main}>
            <h1>About</h1>
            <div className={styles.description}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum, ipsum eget congue varius, quam ex interdum nibh, sit amet rutrum purus ex ac mauris. Vestibulum blandit justo a diam semper, ac imperdiet nisi sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas felis justo, egestas quis purus a, suscipit egestas lorem. Suspendisse potenti. Aenean magna lorem, auctor in commodo et, rutrum vel justo. Donec sodales magna in eleifend pellentesque. Sed et pharetra est. Aenean faucibus leo et convallis laoreet. Phasellus ullamcorper, tortor eget accumsan lobortis, velit libero egestas lorem, auctor cursus lorem elit a odio. Vestibulum ut eleifend nunc. Aliquam erat volutpat. Sed tristique eleifend aliquam. Pellentesque porta imperdiet justo, vel maximus urna aliquet at. Donec felis ipsum, rhoncus ut facilisis non, facilisis vel neque. Cras ac ultricies quam.</p>
                <p>Aliquam pharetra orci ac dui vehicula, et faucibus elit dictum. In nibh ligula, blandit in scelerisque at, venenatis viverra nulla. Phasellus et tristique est. Nam fringilla ultrices odio at tempus. Integer consequat placerat diam, ac vehicula metus tincidunt et. Proin lobortis sed est quis lobortis. Suspendisse neque magna, tristique at massa in, elementum placerat elit. Duis volutpat tristique mauris et posuere. Ut pulvinar nunc justo, sed gravida nibh finibus ut. Pellentesque leo tortor, ultrices at ex at, venenatis ullamcorper metus.</p>
                <p>Ut egestas sem in nisl egestas, ac suscipit nisl semper. Aliquam suscipit nisl sapien, sed venenatis sem vehicula at. Aenean rutrum fermentum viverra. Fusce libero erat, consequat quis elit sed, consectetur auctor nunc. Vestibulum blandit, odio ac iaculis tempus, augue ex molestie massa, ut ultricies arcu urna et mauris. In fringilla sagittis lacinia. Praesent nec malesuada ligula. Aenean placerat viverra feugiat. Curabitur euismod est quis nunc efficitur porttitor.</p>
                <p>Vestibulum malesuada lorem mauris, ut consectetur augue finibus vitae. Sed aliquet arcu in facilisis euismod. Vestibulum sed orci in purus iaculis interdum sed sed dolor. Aliquam sit amet nulla ut orci hendrerit venenatis vel id quam. Maecenas tristique metus neque, vitae eleifend quam volutpat vitae. Fusce at tempor odio, non ultrices odio. Quisque a vulputate nisl, sit amet iaculis mi. Duis vehicula nibh turpis, quis placerat risus blandit pharetra. Morbi et faucibus nisi. Suspendisse accumsan a arcu id pharetra.</p>
                <p>Nullam viverra velit in pellentesque pellentesque. Nam sed imperdiet tortor. In non ligula in lorem malesuada sodales. Aenean elementum dui vel dolor laoreet lobortis. Aliquam eu lobortis ipsum, sed dignissim ipsum. Donec tincidunt odio ac libero sollicitudin egestas id id diam. Curabitur euismod commodo eros vitae vehicula. Donec in malesuada nisl, nec efficitur sapien. Donec molestie nisl faucibus turpis molestie, eu dictum felis tincidunt.</p>
            </div>
        </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
    const filePath = path.join(process.cwd(), 'data/officers.yml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as DataProps
    return {
        props: {
        data
        }
    }
}

type PersonInfoProps = {
    name: string;
    major: string;
    year: number;
    photo: string;
}

function PersonInfo ({name, major, year, photo}: PersonInfoProps) {
    return (
        <div style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: '8px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          }}
        >
            <Image
            style={{ borderRadius: "50%", objectFit: "fill" }}
            src={'/images/officerphotos/' + photo}
            alt={`Profile picture of ${name}`}
            width={100}
            height={100}
            />
            <h3>{name}</h3>
            <p>Major: {major}</p>
            <p>Year: {year}</p>
        </div>
    );
}