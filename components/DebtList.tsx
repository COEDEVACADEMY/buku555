
import React from 'react';
import { YStack, Card, H3, Paragraph, Button, Separator } from 'tamagui';
import { Debt } from '../lib/storage';

type DebtListProps = {
    debts: Debt[];
    onPressAction: (id: number) => void;
    actionText: string;
    emptyMessage: string;
    isPaid: boolean;
};

const DebtList: React.FC<DebtListProps> = ({ debts, onPressAction, actionText, emptyMessage, isPaid }) => {
    return (
        <YStack flex={1} padding="$4" space="$4">
            {debts.length === 0 ? (
                <Paragraph textAlign="center">{emptyMessage}</Paragraph>
            ) : (
                <YStack space="$3">
                    {debts.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Card elevate size="$3">
                                <Card.Header>
                                    <H3>{item.name}</H3>
                                    <Paragraph theme={isPaid ? 'alt2' : 'alt1'}>
                                        RM{item.amount.toFixed(2)}
                                    </Paragraph>
                                    {item.description && <Paragraph>{item.description}</Paragraph>}
                                    <Paragraph theme="alt2" size="$2">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </Paragraph>
                                </Card.Header>
                                <Card.Footer>
                                    <Button onPress={() => onPressAction(item.id)}>
                                        {actionText}
                                    </Button>
                                </Card.Footer>
                            </Card>
                            {index < debts.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </YStack>
            )}
        </YStack>
    );
};

export default DebtList;
