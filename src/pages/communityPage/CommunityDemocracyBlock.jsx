import style from './CommunityDemocracyBlock.module.css';
import OutlineFilledDivWithShowMore from "../../components/UI/blocks/OutlineFilledDivWithShowMore";
import MyPulseLoader from "../../components/UI/loaders/MyPulseLoader";
import {useEffect} from "react";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import DarkTransparentBackground from "../../components/UI/blocks/DarkTransparentBackground";

function CommunityDemocracyBlock({data, setData, groupname}) {

    const [fetchData, isFetchingLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getDemocracyData(groupname)
        setData(responseData)
        console.log("democracy data: ", responseData)
    })

    useEffect(() => {
        fetchData()
    }, [])

    function showMoreContent() {
        return (
            <div className={style.showMoreInfo}>

            </div>
        );
    }

    if (data)
        return (
            <div>
                <OutlineFilledDivWithShowMore
                    showMoreContent={showMoreContent()}
                >
                    <div className={style.generalInfo}>
                        <div>
                            <div>
                                Current president program:
                            </div>
                            <DarkTransparentBackground>
                                {data.currentPresidentProgram}
                            </DarkTransparentBackground>

                        </div>

                        <div>
                            Stats:
                        </div>

                        <div>
                            Candidate profile:
                        </div>
                    </div>
                </OutlineFilledDivWithShowMore>
            </div>
        );
    else
        return (
            <MyPulseLoader />
        );
}

export default CommunityDemocracyBlock;