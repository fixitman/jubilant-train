import { Typography } from '@mui/material'

import {useStoreState} from 'easy-peasy'

function ErrorDisplay() {
    const error = useStoreState(store => store.error.message)

    if (error?.length > 0) {
        return (
            <div>
                <Typography variant='h4'>{error}</Typography>
            </div>
        )
    }else{
        return <></>
    }
}

export default ErrorDisplay