'use client'
import { useEffect, useState } from "react";
import { Card, CardHeader } from "react-bootstrap";
import { newResource, ResourceCollection } from '@/models/resource'
import { Container , Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faAdd, faRefresh} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'

export default  function Lists(){
    const router = useRouter()
    const dict = useDictionary()

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const pokemonListURL = `${process.env.NEXT_PUBLIC_BASE_URL}product-labels` || ''
    const url = new URL(pokemonListURL)
    console.log("url: " + url)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch(url);
                if (!res.ok) throw new Error("Lỗi khi gọi API");
                const json = await res.json();

                setData(json.data || []);
               
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
   
    
    console.log(data)
    return(
        <Container >
            <Card>
                <CardHeader>
                    <div className="w-100 justify-content-between d-flex flex-wrap align-items-center gap-1">
                        <div className="d-flex flex-wrap flex-md-nowrap align-items-center gap-1">
                            <button className="btn   btn-show-table-options" type="button">
                                Filters
                            </button>
                                        
                            <div className="position-relative">
                                <input type="text" className="form-control ps-3" placeholder="Search..." />
                                <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                                    <FontAwesomeIcon className="nav-icon me-auto" icon={faSearch} /> 
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-1 table-action-buttons">
                            <button className="btn action-item btn-primary"  type="button"  onClick={() => router.push('/pokemons/create')}>
                                <FontAwesomeIcon className="nav-icon me-2" icon={faAdd} /> 
                                    
                                <span data-action="create" data-href="#">
                                    {dict.form.create}
                                </span>
                            </button>
                            <button className="btn action-item btn-outline-secondary"  type="button">
                                <span className="me-2">
                                    <FontAwesomeIcon className="nav-icon me-auto" icon={faRefresh} /> 
                                </span>
                                <span data-action="create" data-href="#">
                                    Reload
                                </span>
                            </button>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </Container>
    )
}