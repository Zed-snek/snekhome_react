import {useDocumentTitle} from "usehooks-ts";
import VoteForm from "../components/UI/inputs/VoteForm";
import OutlineFilledDiv from "../components/UI/blocks/OutlineFilledDiv";
import DarkTransparentBackground from "../components/UI/blocks/DarkTransparentBackground";

function InfoPage() {

    useDocumentTitle("Information")

    return (
        <div>
            <h1> Some Info </h1>
            <div style={{width: 50+"%"}}>
                <VoteForm
                    votedId={-1}
                    options={[
                        {id: 1, title: "spaghetti", votes: 10},
                        {id: 2, title: "fish and chips", votes: 5},
                        {id: 3, title: "burgers", votes: 19},
                        {id: 4, title: "eggs and beacon", votes: 8}
                    ]}
                    onVoteCallback={value => console.log(value)}
                />

                <VoteForm
                    votedId={2}
                    options={[
                        {id: 1, title: "spaghetti", votes: 10},
                        {id: 2, title: "fish and chips", votes: 5},
                        {id: 3, title: "burgers", votes: 19},
                        {id: 4, title: "eggs and beacon", votes: 8}
                    ]}
                />
                <br/>

                <OutlineFilledDiv>
                    <DarkTransparentBackground>
                        TExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExtTExt
                        sFDSFSD fsdf dsf <br/>
                        sfsdgsdg dsg sdg
                    </DarkTransparentBackground>
                </OutlineFilledDiv>
            </div>
        </div>
    );
}

export default InfoPage;