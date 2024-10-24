import { useBackend } from '../backend';
import { AnimatedNumber, Box, Button, LabeledList, Section } from '../components';
import { Window } from '../layouts';
import { CargoCatalog } from './Cargo';
import { InterfaceLockNoticeBox } from './common/InterfaceLockNoticeBox';

export const CargoExpress = (props, context) => {
  const { act, data } = useBackend(context);
  return (
    <Window
      width={600}
      height={700}
      resizable>
      <Window.Content scrollable>
        <InterfaceLockNoticeBox
          accessText="a QM-level ID card" />
        {!data.locked && (
          <CargoExpressContent />
        )}
      </Window.Content>
    </Window>
  );
};

const CargoExpressContent = (props, context) => {
  const { act, data } = useBackend(context);
  return (
    <>
      <Section
        title="Cargo Express"
        buttons={(
          <Box inline bold>
            <AnimatedNumber
              value={Math.round(data.points)} />
            {' credits'}
          </Box>
        )}>
        <LabeledList>
          <LabeledList.Item label="Landing Location">
            <Button
              selected={data.usingBeacon}
              disabled={!data.hasBeacon}
              onClick={() => act('LZBeacon')}>
              {data.beaconzone} ({data.beaconName})
            </Button>
          </LabeledList.Item>
          <LabeledList.Item label="Notice">
            {data.message}
          </LabeledList.Item>
        </LabeledList>
      </Section>
      <CargoCatalog express />
    </>
  );
};
