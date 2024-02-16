import { useRouter } from 'next/router'


export default function Company(name:string){
    const router = useRouter()
    const company = router.query.company as string
    
    
    return (
        <div>{company}</div>
    );
}